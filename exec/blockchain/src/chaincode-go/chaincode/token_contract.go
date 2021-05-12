package chaincode

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for transferring tokens between accounts
type SmartContract struct {
	contractapi.Contract
}

// event provides an organized struct for emitting events
type event struct {
	From  string `json:"from"`
	To    string `json:"to"`
	Value int    `json:"value"`
}

type User struct {
	ID      string `json:"userId"`
	Type    string `json:"type"`
	Balance int    `json:"balance"`
}

type Transaction struct {
	TXID  string `json:"txId"`
	From  string `json:"from"`
	To    string `json:"to"`
	Value int    `json:"value"`
}

// TransferFrom transfers the value amount from the "from" address to the "to" address
// This function triggers a Transfer event
func (s *SmartContract) TransferFrom(ctx contractapi.TransactionContextInterface, from string, to string, value int) (*Transaction, error) {

	// Initiate the transfer
	err := transferHelper(ctx, from, to, value)
	if err != nil {
		return nil, fmt.Errorf("failed to transfer: %v", err)
	}

	// Set transaction
	transaction, err := SetTransaction(ctx, from, to, value)
	if err != nil {
		return nil, fmt.Errorf("failed to set transaction: %v", err)
	}

	// Emit the Transfer event
	err = SetEvent(ctx, "Transfer", event{from, to, value})
	if err != nil {
		return nil, err
	}

	log.Printf("%s transfer %d balance to %s", from, value, to)

	return transaction, nil
}

// Helper Functions

// transferHelper is a helper function that transfers tokens from the "from" address to the "to" address
// Dependant functions include Transfer and TransferFrom
func transferHelper(ctx contractapi.TransactionContextInterface, from string, to string, value int) error {

	if from == to {
		return fmt.Errorf("cannot transfer to and from same client account")
	}

	if value < 0 { // transfer of 0 is allowed in ERC-20, so just validate against negative amounts
		return fmt.Errorf("transfer amount cannot be negative")
	}

	fromUser, err := GetUser(ctx, from)
	if err != nil {
		return err
	}

	toUser, err := GetUser(ctx, to)
	if err != nil {
		return err
	}

	if fromUser.Balance < value {
		return fmt.Errorf("user balance lower than %d", value)
	}

	beforeFromUserBalance := fromUser.Balance
	beforeToUserBalance := toUser.Balance
	fromUser.Balance -= value
	toUser.Balance += value

	// update
	fromUserJSON, err := json.Marshal(fromUser)
	if err != nil {
		return err
	}

	toUserJSON, err := json.Marshal(toUser)
	if err != nil {
		return err
	}

	err = ctx.GetStub().PutState(from, fromUserJSON)
	if err != nil {
		return err
	}

	err = ctx.GetStub().PutState(to, toUserJSON)
	if err != nil {
		return err
	}

	log.Printf("client %s balance updated from %d to %d", from, beforeFromUserBalance, fromUser.Balance)
	log.Printf("recipient %s balance updated from %d to %d", to, beforeToUserBalance, toUser.Balance)

	return nil
}

func SetEvent(ctx contractapi.TransactionContextInterface, eventName string, e event) error {
	// Emit the Transfer event
	transferEvent := e
	transferEventJSON, err := json.Marshal(transferEvent)
	if err != nil {
		return fmt.Errorf("failed to obtain JSON encoding: %v", err)
	}
	err = ctx.GetStub().SetEvent("Transfer", transferEventJSON)
	if err != nil {
		return fmt.Errorf("failed to set event: %v", err)
	}

	return nil
}

func GetUser(ctx contractapi.TransactionContextInterface, id string) (*User, error) {
	userJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if userJSON == nil {
		return nil, fmt.Errorf("user %s does not exist", id)
	}

	var user User
	err = json.Unmarshal(userJSON, &user)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (s *SmartContract) GetUser(ctx contractapi.TransactionContextInterface, id string) (*User, error) {
	userJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if userJSON == nil {
		return nil, fmt.Errorf("user %s does not exist", id)
	}

	var user User
	err = json.Unmarshal(userJSON, &user)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (s *SmartContract) CreateUser(ctx contractapi.TransactionContextInterface, _id string, _type string, _balance int) (*User, error) {
	exist, _ := s.UserExist(ctx, _id)
	if exist {
		return nil, fmt.Errorf("user %s exist", _id)
	}

	user := User{ID: _id, Type: _type, Balance: _balance}
	userJSON, err := json.Marshal(user)
	if err != nil {
		return nil, fmt.Errorf("cannot create user: %v", err)
	}

	err = ctx.GetStub().PutState(_id, userJSON)
	if err != nil {
		return nil, fmt.Errorf("failed to put to world state. %v", err)
	}

	return &user, nil
}

func (s *SmartContract) DeleteUser(ctx contractapi.TransactionContextInterface, _id string) error {
	exist, err := s.UserExist(ctx, _id)
	if !exist {
		return fmt.Errorf("user %s does not exist: %v", _id, err)
	}

	err = ctx.GetStub().DelState(_id)
	if err != nil {
		return fmt.Errorf("failed to put to world state. %v", err)
	}

	return nil
}

func (s *SmartContract) UserExist(ctx contractapi.TransactionContextInterface, id string) (bool, error) {
	userJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}
	if userJSON == nil {
		return false, fmt.Errorf("user %s does not exist", id)
	}

	return userJSON != nil, nil
}

func (s *SmartContract) GetTransaction(ctx contractapi.TransactionContextInterface, txid string) (*Transaction, error) {
	transactionJSON, err := ctx.GetStub().GetState(txid)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if transactionJSON == nil {
		return nil, fmt.Errorf("the transaction %s does not exist", txid)
	}

	var transaction Transaction
	err = json.Unmarshal(transactionJSON, &transaction)
	if err != nil {
		return nil, err
	}
	return &transaction, nil
}

func SetTransaction(ctx contractapi.TransactionContextInterface, from string, to string, balance int) (*Transaction, error) {
	txid := ctx.GetStub().GetTxID()
	transaction := Transaction{TXID: txid, From: from, To: to, Value: balance}
	transactionJSON, err := json.Marshal(transaction)
	if err != nil {
		return nil, err
	}

	err = ctx.GetStub().PutState(txid, transactionJSON)

	return &transaction, err
}

func (s *SmartContract) SetBalance(ctx contractapi.TransactionContextInterface, id string, balance int) (*User, error) {
	user, err := GetUser(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("user id %s does not exist", id)
	}

	user.Balance = balance
	userJSON, err := json.Marshal(user)
	if err != nil {
		return nil, err
	}

	err = ctx.GetStub().PutState(user.ID, userJSON)
	if err != nil {
		return nil, fmt.Errorf("failed to put to world state. %v", err)
	}

	return user, nil
}
