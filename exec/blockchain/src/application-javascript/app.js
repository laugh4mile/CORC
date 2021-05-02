/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// fabric
const {
	Gateway,
	Wallets
} = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const {
	buildCAClient,
	registerAndEnrollUser,
	enrollAdmin
} = require('./util/CAUtil.js');
const {
	buildCCPOrg1,
	buildWallet,
	prettyJSONString
} = require('./util/AppUtil.js');

const channelName = 'mychannel';
const chaincodeName = 'basic';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser17';

// express
const express = require('express')
const app = express()
const morgan = require('morgan');
const {
	assert,
	error,
	exception
} = require('console');
const {
	parse
} = require('path');
const {
	json
} = require('express');

app.use(express.json())
app.use(express.urlencoded({
	extended: false
}))
app.use(morgan('dev'))

class Contract {
	constructor() {
		this.setup()
	}

	async setup() {
		try {
			// build an in memory object with the network configuration (also known as a connection profile)
			const ccp = buildCCPOrg1();

			// build an instance of the fabric ca services client based on
			// the information in the network configuration
			const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

			// setup the wallet to hold the credentials of the application user
			const wallet = await buildWallet(Wallets, walletPath);

			// in a real application this would be done on an administrative flow, and only once
			await enrollAdmin(caClient, wallet, mspOrg1);

			// in a real application this would be done only when a new user was required to be added
			// and would be part of an administrative flow
			await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

			// Create a new gateway instance for interacting with the fabric network.
			// In a real application this would be done as the backend server session is setup for
			// a user that has been verified.
			const gateway = new Gateway();

			try {
				// setup the gateway instance
				// The user will now be able to create connections to the fabric network and be able to
				// submit transactions and query. All transactions submitted by this gateway will be
				// signed by this user using the credentials stored in the wallet.
				await gateway.connect(ccp, {
					wallet,
					identity: org1UserId,
					discovery: {
						enabled: true,
						asLocalhost: false
					}, // using asLocalhost as this gateway is using a fabric network deployed locally
					eventHandlerOptions: {
						strategy: null
					}
				});

				// Build a network instance based on the channel where the smart contract is deployed
				const network = await gateway.getNetwork(channelName);

				// Get the contract from the network.
				this.contract = network.getContract(chaincodeName);
			} finally {
				// Disconnect from the gateway when the application is closing
				// This will close all connections to the network
				gateway.disconnect();
			}
		} catch (error) {
			console.error(`******** FAILED to run the application: ${error}`);
		}
	}

	async submitTransaction(name, args) {
		return await this.contract.submitTransaction(name, ...args);

	}

	async evaluateTransaction(name, args) {
		return await this.contract.evaluateTransaction(name, ...args);
	}
}

function getResult(isSuccess, rs, debug = 0) {
	if (isSuccess) {
		if (debug) console.log(`Result: ${rs}`)
		return {
			"state": isSuccess,
			"result": JSON.parse(rs.toString())
		}
	}

	if (debug) console.log(`Error: ${rs}`)
	return {
		"state": isSuccess,
		"error": rs
	}
}

const c = new Contract();

// func (s *SmartContract) CreateUser(ctx contractapi.TransactionContextInterface, _id string, _type string) (*User, error)
app.get('/createuser', async (req, res) => {
	try {
		let result = await c.submitTransaction("CreateUser", ["TestUser", "User"])
		await c.submitTransaction("CreateUser", ["TestSeller", "Seller"])
		await c.submitTransaction("CreateUser", ["TestUser2", "User"])
		return res.json(getResult(true, result))
	} catch (error) {
		return res.json(getResult(false, error))
	}
})

// func (s *SmartContract) DeleteUser(ctx contractapi.TransactionContextInterface, _id string) error
app.get('/deleteuser', async (req, res) => {
	try {
		let result = await c.submitTransaction("DeleteUser", ["TestUser2"])
		return res.json(getResult(true, result))
	} catch (error) {
		return res.json(getResult(false, error))
	}
})

// func (s *SmartContract) SetBalance(ctx contractapi.TransactionContextInterface, id string, balance int) (*User, error) {
app.get('/setbalance', async (req, res) => {
	try {
		let result = await c.submitTransaction("SetBalance", ["TestUser", "1000000"])
		return res.json(getResult(true, result))
	} catch (error) {
		return res.json(getResult(false, error))
	}
})

// func (s *SmartContract) GetUser(ctx contractapi.TransactionContextInterface, id string) (*User, error)
app.get('/getuser', async (req, res) => {
	try {
		let result = await c.evaluateTransaction("GetUser", ["TestUser"])
		return res.json(getResult(true, result))
	} catch (error) {
		return res.json(getResult(false, error))
	}
})

// func (s *SmartContract) TransferFrom(ctx contractapi.TransactionContextInterface, from string, to string, value int) (*Transaction, error)
app.get('/transfer', async (req, res) => {
	try {
		let result = await c.submitTransaction("TransferFrom", ["TestUser", "TestSeller", "1000"])
		return res.json(getResult(true, result))
	} catch (error) {
		return res.json(getResult(false, error))
	}
})

// func (s *SmartContract) UserExist(ctx contractapi.TransactionContextInterface, id string) (bool, error)
app.get('/userexist', async (req, res) => {
	try {
		let result = await c.evaluateTransaction("UserExist", ["TestUser"])
		return res.json(getResult(true, result))
	} catch (error) {
		return res.json(getResult(false, error))
	}
})

// func (s *SmartContract) GetTransaction(ctx contractapi.TransactionContextInterface, txid string) (*Transaction, error)
app.get('/gettransaction/:txid', async (req, res) => {
	try {
		if (req.params.txid == "") throw new Error()
		let result = await c.evaluateTransaction("GetTransaction", [req.params.txid])
		return res.json(getResult(true, result))
	} catch (error) {
		return res.json(getResult(false, error))
	}
})

app.listen(8080, () => {
	console.log('8080 server online');
})