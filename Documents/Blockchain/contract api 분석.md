# Contract API 분석

**README: 컨트랙트 작성을 위해 필요 메서드만 정리**

TIP: 기본적으로 컨트랙트의 함수들의 첫 인자는 `ctx contractapi.TransactionContextInterface`로 시작한다.

### Reference
- [contractapi#TransactionContextInterface](pkg.go.dev/github.com/hyperledger/fabric-contract-api-go/contractapi#TransactionContextInterface)
- [shim#ChaincodeStubInterface](pkg.go.dev/github.com/hyperledger/fabric-chaincode-go/shim#ChaincodeStubInterface)
- [cid#ClientIdentity](https://pkg.go.dev/github.com/hyperledger/fabric-chaincode-go/pkg/cid#ClientIdentity)


  
### `TransactionContextInterface` 분석
- GetStub() [shim.ChaincodeStubInterface](pkg.go.dev/github.com/hyperledger/fabric-chaincode-go/shim#ChaincodeStubInterface)
- GetClientIdentity() [cid.ClientIdentity](https://pkg.go.dev/github.com/hyperledger/fabric-chaincode-go/pkg/cid#ClientIdentity)

### `ChaincodeStubInterface` 분석
- GetTxId() string
    - 현재 제안 트랜젝션의 tx_id를 반환한다.
- GetState(key string) ([]byte, error)
    - key에 해당하는 value를 state database(ledger)에서 찾아 반환한다.
    - key가 존재하지 않으면 (nil, nil)을 반환한다.
    - **Note: writeset에서 데이터를 읽지 않는다. 즉, PutState에 의해 수정되었지만, 커밋되지 않은 데이터를 고려해야 한다.**
    - 파생 함수는 Docs를 참고하자.
- PutState(key string, value []byte) error
    - {key: value} 값을 트랜젝션의 writeset에 작성해서 제안한다.
    - 데이터는 트랜젝션이 커밋될 때까지 반영되지 않는다.
- DelState(key string) error
    - 해당 key의 데이터를 삭제한다
- CreateCompositeKey(objectType string, attributes []string) (string, error)
    - objectType과 attributes에 전달된 데이터를 합성하여 새로운 key를 생성한다.
    - 생성된 key는 PutState()의 key로 사용할 수 있다.
- SplitCompositeKey(compositeKey string) (string, []string, error)
    - objectType, attributes를 분해해서 반환한다.
- SetEvent(name string, payload []byte) error
    - 트랜잭션의 유효성에 관계 없이 이벤트를 발생시킬 수 있다.
    - 단일 이벤트만 트랜잭션에 포함될 수 있다.