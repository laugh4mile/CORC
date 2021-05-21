package com.web.shinhan.controller;

import com.web.shinhan.model.BlockUserDto;
import com.web.shinhan.model.TransactionDto;
import com.web.shinhan.model.service.BlockchainService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/func-test")
@CrossOrigin(origins = {"*"})
public class TestController {

  public static final Logger logger = LoggerFactory.getLogger(TestController.class);

  @Autowired
  BlockchainService blockchainService;

  @ApiOperation(value = "createUser")
  @PostMapping("/user")
  public void createUser(@RequestBody BlockUserDto user) {
    logger.info("create user");
    // set user testcode to 0
    Mono<BlockUserDto> rs = blockchainService.createUser(user);
    rs.subscribe(response -> {
      logger.info("user: " + response.toString());
      // set user testcode to 1
    }, err -> logger.error(err.getMessage()));
  }

  @ApiOperation(value = "deleteUser")
  @DeleteMapping("/user/{userId}")
  public void createUser(@PathVariable String userId) {
    logger.info("delete user");
    Mono<BlockUserDto> rs = blockchainService.deleteUser(userId);
    rs.subscribe(response -> {
      logger.info("user: " + response.toString());
    }, err -> logger.error(err.getMessage()));
  }

  @ApiOperation(value = "getUser")
  @GetMapping("/user/{userId}")
  public ResponseEntity<BlockUserDto> getUser(@PathVariable String userId) {
    logger.info("get user");
    try{
      BlockUserDto rs = blockchainService.getUser(userId).block();
      return new ResponseEntity<>(rs, HttpStatus.OK);
    }catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation(value = "setBalance")
  @PutMapping("/user")
  public void setBalance(@RequestBody BlockUserDto user) {
    logger.info("set balance");
    // set user testcode to 0
    Mono<BlockUserDto> rs = blockchainService.setBalance(user);
    rs.subscribe(response -> {
      logger.info("user: " + response.toString());
      // set user testcode to 1
    }, err -> logger.error(err.getMessage()));
  }

  @ApiOperation(value = "createTransaction")
  @PostMapping("/transaction")
  public void createTransaction(@RequestBody TransactionDto tx) {
    logger.info("send balance");
    // set transaction testcode to 1
    Mono<TransactionDto> rs4 = blockchainService.createTransaction(tx);
    rs4.subscribe(response -> {
      logger.info("transaction: " + response.toString());
      // set transaction testcode to 1
      // set transaction id
    }, err -> logger.error(err.getMessage()));
  }

  @ApiOperation(value = "getTransaction")
  @GetMapping("/transaction/{txId}")
  public ResponseEntity<TransactionDto> getTransaction(@PathVariable String txId) {
    logger.info("get transaction");
    try {
      TransactionDto rs5 = blockchainService
          .getTransaction(txId)
          .block();
      logger.info("transaction: " + rs5.toString());

      return new ResponseEntity<>(rs5, HttpStatus.OK);
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
  }
}