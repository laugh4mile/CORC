package com.web.shinhan.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.web.shinhan.model.BasicResponse;
import com.web.shinhan.model.service.ETCService;
import com.web.shinhan.model.service.ETCServiceImpl;

import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@ApiResponses(value = {
    @ApiResponse(code = 401, message = "Unauthorized", response = BasicResponse.class),
    @ApiResponse(code = 403, message = "Forbidden", response = BasicResponse.class),
    @ApiResponse(code = 404, message = "Not Found", response = BasicResponse.class),
    @ApiResponse(code = 500, message = "Failure", response = BasicResponse.class)})
@Controller
@RequestMapping("/service/*")
@CrossOrigin(origins = "*")
public class ServiceController {

  @Autowired
  ETCService service;

  private static final Logger logger = LoggerFactory.getLogger(ServiceController.class);

  @PostMapping("/mail")
  @ResponseBody
  public void emailConfirm(
      @RequestParam @ApiParam(value = "로그인 이메일 아이디", required = true) String email)
      throws Exception {
    logger.info("emailConfirm - 호출");

    service.sendSimpleMessage(email);
  }

  @PostMapping("/verifyCode")
  @ResponseBody
  public int verifyCode(
      @RequestParam @ApiParam(value = "로그인 이메일 코드", required = true) String code) {
    logger.info("verifyCode - 호출");

    int result = 0;

    if (ETCServiceImpl.ePw.equals(code)) {
      result = 1;
    }

    return result;
  }
}