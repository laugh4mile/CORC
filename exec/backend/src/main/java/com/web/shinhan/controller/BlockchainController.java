package com.web.shinhan.controller;

import com.web.shinhan.model.PeerStatusDto;
import com.web.shinhan.model.service.BlockchainService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/blockchain")
@CrossOrigin(origins = {"*"})
public class BlockchainController {

  public static final Logger logger = LoggerFactory.getLogger(BlockchainController.class);

  private BlockchainService blockchainService;

  @Autowired
  public void setBlockchainService(BlockchainService blockchainService) {
    this.blockchainService = blockchainService;
  }

  @ApiOperation(value = "피어 상태 조회", notes = "피어들의 상태를 반환한다.")
  @GetMapping("/peer-status")
  public ResponseEntity<PeerStatusDto[]> getPeersStatus() {
    logger.info("getPeersStatus - 호출");

    try {
      return new ResponseEntity<>(blockchainService.getPeersStatus().block(), HttpStatus.OK);
    }
    catch (Exception e) {
      logger.error(e.getMessage());

      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }
}
