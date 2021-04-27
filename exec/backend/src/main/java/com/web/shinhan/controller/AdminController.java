package com.web.shinhan.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.shinhan.model.UserDto;
import com.web.shinhan.model.service.UserService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = { "*" })
public class AdminController {

	public static final Logger logger = LoggerFactory.getLogger(AdminController.class);

	@Autowired
	UserService userService;

	@ApiOperation(value = "사용자 등록", notes = "입력한 정보를 토대로 DB에 정보를 저장한다.", response = Boolean.class)
	@PostMapping
	public ResponseEntity<Boolean> regist(@RequestBody UserDto user) {
		logger.info("regist - 호출");

		HttpStatus status = HttpStatus.ACCEPTED;
		boolean flag = true;

		// 회원 정보 담기
		user.setAccess_time(LocalDateTime.now());
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

//	@ApiOperation(value = "회원 목록 조회", notes = "회원들의 정보(이메일, 이름, 가입일, 권한, 프로필, 게시글 수, 댓글 수)을 반환한다.", response = HashMap.class)
//	@GetMapping
//	public ResponseEntity<Map<String, Object>> getMembers(@RequestParam String email) throws Exception {
//		logger.info("getMembers - 호출");
//
//		Map<String, Object> resultMap = new HashMap<>();
//		HttpStatus status = HttpStatus.OK;
//
//		// 회원 정보 조회
//		try {
//			if (!"admin".equals(userService.getRole(email))) {
//				resultMap.put("message", "Not a Admin Account");
//				status = HttpStatus.METHOD_NOT_ALLOWED;
//				return new ResponseEntity<Map<String, Object>>(resultMap, status);
//			}
//			resultMap.put("members", userService.getAllUser());
//			status = HttpStatus.OK;
//		} catch (Exception e) {
//			resultMap.put("message", e.getMessage());
//			status = HttpStatus.INTERNAL_SERVER_ERROR;
//		}
//
//		return new ResponseEntity<Map<String, Object>>(resultMap, status);
//	}

//	@GetMapping(value = "/{id}")
//	public Optional<Board> findOne(@PathVariable Long id) {
//		return boardRep.findById(id);
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

	@ApiOperation(value = "회원 탈퇴 처리", notes = "회원들을 탈퇴 처리하여 성공 여부에 따라 true, false를 반환한다.", response = Boolean.class)
	@DeleteMapping
	public ResponseEntity<Boolean> deleteMembers(@RequestBody String[] targets) {
		logger.info("deleteMembers - 호출");

		HttpStatus status = HttpStatus.ACCEPTED;
		boolean flag = false;

		// 회원 탈퇴
		try {
			for (String email : targets) {
//				flag = userService.delete(email);
				if (!flag) {
					return new ResponseEntity<Boolean>(false, HttpStatus.NO_CONTENT);
				}
			}
			status = HttpStatus.ACCEPTED;
		} catch (Exception e) {
			e.printStackTrace();
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Boolean>(flag, status);
	}

}