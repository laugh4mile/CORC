const { Contract } = require('./util/Contract.js');

const c = new Contract();

// func (s *SmartContract) CreateUser(ctx contractapi.TransactionContextInterface, _id string, _type string) (*User, error)
exports.createUser = async function (userId, type, balance) {
  return await c.submitTransaction('CreateUser', [userId, type, balance]);
};

// func (s *SmartContract) DeleteUser(ctx contractapi.TransactionContextInterface, _id string) error
exports.deleteUser = async function (userId) {
  return await c.submitTransaction('DeleteUser', [userId]);
};

// func (s *SmartContract) SetBalance(ctx contractapi.TransactionContextInterface, id string, balance int) (*User, error) {
exports.setBalance = async function (userId, value) {
  return await c.submitTransaction('SetBalance', [userId, value]);
};

// func (s *SmartContract) GetUser(ctx contractapi.TransactionContextInterface, id string) (*User, error)
exports.getUser = async function (userId) {
  return await c.evaluateTransaction('GetUser', [userId]);
};

// func (s *SmartContract) TransferFrom(ctx contractapi.TransactionContextInterface, from string, to string, value int) (*Transaction, error)
exports.transferFrom = async function (from, to, value) {
  return await c.submitTransaction('TransferFrom', [from, to, value]);
};

// func (s *SmartContract) UserExist(ctx contractapi.TransactionContextInterface, id string) (bool, error)
exports.userExist = async function (userId) {
  return await c.evaluateTransaction('UserExist', [userId]);
};

// func (s *SmartContract) GetTransaction(ctx contractapi.TransactionContextInterface, txid string) (*Transaction, error)
exports.getTransaction = async function (txid) {
  return await c.evaluateTransaction('GetTransaction', [txid]);
};
