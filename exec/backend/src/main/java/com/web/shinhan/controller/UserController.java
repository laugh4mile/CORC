package com.web.shinhan.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.shinhan.model.UserDto;
import com.web.shinhan.model.service.ETCService;
import com.web.shinhan.model.service.UserService;

import io.swagger.annotations.ApiOperation;

//import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = { "*" })
public class UserController {

	public static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	UserService userService;

//	@Autowired
//	StoreService storeService;

	@Autowired
	ETCService etcService;

	@ApiOperation(value = "회원가입", notes = "입력한 정보를 토대로 DB에 정보를 저장한다.", response = Boolean.class)
	@PostMapping
//	public ResponseEntity<Boolean> regist(@RequestBody Map<String, String> map) {
	public ResponseEntity<Boolean> regist(@RequestBody UserDto user) {
		logger.info("regist - 호출");

		HttpStatus status = HttpStatus.ACCEPTED;
		boolean flag = true;

		// 회원 정보 담기
		user.setAccess_time(LocalDateTime.now());
//		System.out.println(user);
		// 회원가입
		try {
			userService.insertUser(user);
			status = HttpStatus.ACCEPTED;
		} catch (Exception e) {
			e.printStackTrace();
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Boolean>(flag, status);
	}

//	@ApiOperation(value = "이메일 중복 체크", notes = "같은 이메일로 가입한 사용자가 있는지 확인한다.", response = Boolean.class)
//	@PostMapping("/emailCheck")
//	public ResponseEntity<Boolean> emailCheck(@RequestParam String email) {
//		logger.info("emailCheck - 호출");
//
//		HttpStatus status = HttpStatus.ACCEPTED;
//
//		boolean isExisted = userService.emailCheck(email);
//		if (!isExisted) {
//			try {
//				etcService.sendSimpleMessage(email);
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//		}
//
//		return new ResponseEntity<Boolean>(isExisted, status);
//	}

//	@ApiOperation(value = "회원 정보 조회", notes = "회원의 정보를 가지고 온다.", response = HashMap.class)
//	@GetMapping
//	public ResponseEntity<Map<String, Object>> getInfo(@RequestParam String email, HttpServletRequest req)
//			throws Exception {
//		logger.info("getInfo - 호출");
//		Map<String, Object> resultMap = new HashMap<>();
//		HttpStatus status = HttpStatus.ACCEPTED;
//
//		// 회원 정보 조회
//		try {
//			resultMap.put("info", userService.findUserInfo(email));
//			resultMap.put("reviewList", userService.getReviewList(email));
//			status = HttpStatus.ACCEPTED;
//		} catch (RuntimeException e) {
//			resultMap.put("message", e.getMessage());
//			status = HttpStatus.INTERNAL_SERVER_ERROR;
//		}
//
//		return new ResponseEntity<Map<String, Object>>(resultMap, status);
//	}

//	@ApiOperation(value = "회원 탈퇴", notes = "회원탈퇴를 한다.", response = Boolean.class)
//	@PutMapping("/delete")
//	public ResponseEntity<Boolean> delete(@RequestBody Map<String, String> map) {
//		logger.info("delete - 호출");
//
//		HttpStatus status = HttpStatus.ACCEPTED;
//		boolean flag = false;
//
//		// 회원 탈퇴
//		try {
//			String email = map.get("email");
//			flag = userService.delete(email);
//			status = HttpStatus.ACCEPTED;
//		} catch (Exception e) {
//			e.printStackTrace();
//			status = HttpStatus.INTERNAL_SERVER_ERROR;
//		}
//
//		return new ResponseEntity<Boolean>(flag, status);
//	}

}