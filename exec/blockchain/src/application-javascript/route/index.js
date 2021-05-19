/**
 * @swagger
 * tags:
 *   name: APIs
 *   description: RESTAPI List
 */

const express = require('express');
const router = express.Router();
const { getResult } = require('../util/MyUtil');
const axios = require('axios').default;

// peer list
const peerList = ['peer0.org1.example.com', 'peer0.org2.example.com'];

// chaincode
const { createUser, deleteUser, getTransaction, getUser, setBalance, transferFrom } = require('../service.js');

/**
 * @swagger
 *  /user:
 *    post:
 *      tags:
 *      - APIs
 *      description: 유저를 생성한다. 초기 Balance 0 고정
 *      summary: Create one user
 *      produces:
 *      - application/json
 *      requestBody:
 *        description: "User object"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        400:
 *          description: Invalid params
 */
router.post('/user', async (req, res) => {
  try {
    if (typeof req.body['userId'] !== 'string' || typeof req.body['type'] !== 'string' || typeof req.body['balance'] !== 'number')
      throw new Error();
    const userId = req.body.userId;
    const type = req.body.type;
    const balance = req.body.balance;

    let result = await createUser(userId, type, balance);
    return res.status(200).json(getResult(true, result));
  } catch (error) {
    return res.status(400).json(getResult(false, error));
  }
});

/**
 * @swagger
 *  /user/{userId}:
 *    get:
 *      tags:
 *      - APIs
 *      description: 유저를 가져온다.
 *      summary: Get one user
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: userId
 *        in: path
 *        description: "ID of user"
 *        required: true
 *        type: integer
 *      responses:
 *        200:
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        400:
 *          description: Invalid params
 */
router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    let result = await getUser(userId);
    return res.status(200).json(getResult(true, result));
  } catch (error) {
    return res.status(400).json(getResult(false, error));
  }
});

/**
 * @swagger
 *  /user/{userId}:
 *    delete:
 *      tags:
 *      - APIs
 *      description: 유저를 제거한다.
 *      summary: Delete one user
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: userId
 *        in: path
 *        description: "ID of user"
 *        required: true
 *        type: string
 *      responses:
 *        200:
 *          description: Successful operation
 *        400:
 *          description: Invalid params
 */
router.delete('/user/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    let result = await deleteUser(userId);
    return res.status(200).json(getResult(true, result));
  } catch (error) {
    return res.status(400).json(getResult(false, error));
  }
});

/**
 * @swagger
 *  /balance:
 *    put:
 *      tags:
 *      - APIs
 *      description: 유저의 Balance를 수정한다.
 *      summary: Set user balance
 *      produces:
 *      - application/json
 *      requestBody:
 *        description: "User object"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        400:
 *          description: Invalid params
 */
router.put('/balance', async (req, res) => {
  try {
    if (typeof req.body['userId'] !== 'string' || typeof req.body['balance'] !== 'number') throw new Error();
    const userId = req.body.userId;
    const balance = req.body.balance;

    let result = await setBalance(userId, balance);
    return res.status(200).json(getResult(true, result));
  } catch (error) {
    return res.status(400).json(getResult(false, error));
  }
});

/**
 * @swagger
 *  /transfer:
 *    post:
 *      tags:
 *      - APIs
 *      description: Transaction을 생성한다.
 *      summary: Create transaction
 *      produces:
 *      - application/json
 *      requestBody:
 *        description: "Transaction object"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Transaction'
 *      responses:
 *        200:
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Transaction'
 *        400:
 *          description: Invalid params
 */
router.post('/transfer', async (req, res) => {
  try {
    if (typeof req.body['from'] !== 'string' || typeof req.body['to'] !== 'string' || typeof req.body['value'] !== 'number')
      throw new Error();
    const from = req.body.from;
    const to = req.body.to;
    const value = req.body.value;

    let result = await transferFrom(from, to, value);
    return res.status(200).json(getResult(true, result));
  } catch (error) {
    return res.status(400).json(getResult(false, error));
  }
});

/**
 * @swagger
 *  /transaction/{txId}:
 *    get:
 *      tags:
 *      - APIs
 *      description: 트렌젝션을 가져온다.
 *      summary: Get one user
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: txId
 *        in: path
 *        description: "ID of transaction"
 *        required: true
 *        type: string
 *      responses:
 *        200:
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Transaction'
 *        400:
 *          description: Invalid params
 */
router.get('/transaction/:txId', async (req, res) => {
  const txId = req.params.txId;

  try {
    let result = await getTransaction(txId);
    return res.status(200).json(getResult(true, result));
  } catch (error) {
    return res.status(400).json(getResult(false, error));
  }
});

/**
 * @swagger
 *  /health-check:
 *    get:
 *      tags:
 *      - APIs
 *      description: 피어 상태를 반환한다.
 *      summary: Get peers status
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: Successful operation
 *        400:
 *          description: Invalid params
 */
router.get('/health-check', async (req, res) => {
  let rs = [];
  for (peer of peerList) {
    try {
      const peerResponse = await axios.get(`http://${peer}/healthz`);
      rs = [...rs, { peer, ...peerResponse.data }];
    } catch (error) {
      rs = [...rs, { peer, status: 'Service Unavailable', time: new Date().toJSON() }];
    }
  }

  return res.status(200).json(rs);
});

exports.indexRouter = router;

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - userId
 *        properties:
 *          ID:
 *            type: string
 *          type:
 *            type: string
 *          balance:
 *            type: integer
 *        example:
 *          userId: TestUser
 *          type: User
 *          balance: 0
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Transaction:
 *        type: object
 *        required:
 *          - from
 *          - to
 *          - value
 *        properties:
 *          txId:
 *            type: string
 *          from:
 *            type: string
 *          to:
 *            type: string
 *          value:
 *            type: integer
 *        example:
 *          txId: 47552c4081e0cd919ecd4d090d07293376b686ebd11db20e4934c54a661080f5
 *          from: TestUser
 *          to: TestSeller
 *          value: 1000
 */
