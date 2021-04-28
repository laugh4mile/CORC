package com.web.shinhan.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

import com.web.shinhan.model.PaymentDto;
import com.web.shinhan.model.UserDto;
import com.web.shinhan.model.service.ETCService;
import com.web.shinhan.model.service.PaymentService;
import com.web.shinhan.model.service.UserService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = { "*" })
public class AdminController {

	public static final Logger logger = LoggerFactory.getLogger(AdminController.class);

	@Autowired
	UserService userService;

	@Autowired
	PaymentService paymentService;

	@Autowired
	ETCService etcService;

	@ApiOperation(value = "회원 목록 조회", notes = "회원들의 정보를 반환한다.", response = HashMap.class)
	@GetMapping("/userList")
	public ResponseEntity<Map<String, Object>> findUserList(@RequestParam String email, Pageable pageable)
			throws Exception {
		logger.info("findMembers - 호출");

		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.OK;
		Page<UserDto> page = null;

		// 회원 정보 조회
		try {
			if (!email.equals("admin@admin.com")) {
				resultMap.put("message", "Not a Admin Account");
				status = HttpStatus.METHOD_NOT_ALLOWED;
				return new ResponseEntity<Map<String, Object>>(resultMap, status);
			}
			page = userService.findAllUser(pageable);
			resultMap.put("userList", page);
			status = HttpStatus.OK;
		} catch (Exception e) {
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@ApiOperation(value = "회원 정보 조회", notes = "회원의 정보를 가지고 온다.", response = HashMap.class)
	@GetMapping("userInfo")
	public ResponseEntity<Map<String, Object>> findUserInfo(@RequestParam String email, HttpServletRequest req)
			throws Exception {
		logger.info("findUserInfo - 호출");

		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;

		// 회원 정보 조회
		try {
			resultMap.put("info", userService.findUserInfo(email));
			status = HttpStatus.ACCEPTED;
		} catch (RuntimeException e) {
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@ApiOperation(value = "회원 결제 내역", notes = "회원의 결제 내역을 가지고 온다.", response = HashMap.class)
	@GetMapping("/paymentList")
	public ResponseEntity<Map<String, Object>> findUserPayment(@RequestParam int userId, Pageable pageable,
			HttpServletRequest req) throws Exception {
		logger.info("findUserPayment - 호출");

		Map<String, Object> resultMap = new HashMap<>();
		Page<PaymentDto> page = null;
		HttpStatus status = HttpStatus.ACCEPTED;

		// 회원 정보 조회
		try {
//			resultMap.put("info", userService.findUserInfo(email));
			page = paymentService.findAllPayment(userId, pageable);
			resultMap.put("paymentList", page);
			status = HttpStatus.ACCEPTED;
		} catch (RuntimeException e) {
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@ApiOperation(value = "사용자 등록", notes = "입력한 정보를 토대로 DB에 정보를 저장한다.", response = Boolean.class)
	@PostMapping("/regist")
	public ResponseEntity<Boolean> registUser(@RequestBody UserDto user) {
		logger.info("regist - 호출");

		HttpStatus status = HttpStatus.ACCEPTED;
		boolean flag = true;

		// 회원 정보 담기
		user.setAccessTime(LocalDateTime.now());

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

	@ApiOperation(value = "이메일 중복 체크", notes = "같은 이메일로 가입한 사용자가 있는지 확인한다.", response = Boolean.class)
	@PostMapping("/emailCheck")
	public ResponseEntity<Boolean> emailCheck(@RequestParam String email) {
		logger.info("emailCheck - 호출");

		HttpStatus status = HttpStatus.ACCEPTED;

		return new ResponseEntity<Boolean>(userService.emailCheck(email), status);
	}

	@ApiOperation(value = "사번 중복 체크", notes = "같은 사번으로 가입한 사용자가 있는지 확인한다.", response = Boolean.class)
	@PostMapping("/employeecheck")
	public ResponseEntity<Boolean> employeenumCheck(@RequestParam int employee_num) {
		logger.info("employeenumCheck - 호출");

		HttpStatus status = HttpStatus.ACCEPTED;

		return new ResponseEntity<Boolean>(userService.employeenumCheck(employee_num), status);

	}

//	@ApiOperation(value = "회원 정보 수정", notes = "회원의 정보를 수정한다.", response = Boolean.class)
//	@PutMapping("/nickname")
//	public ResponseEntity<Boolean> modifyUserInfo(@RequestBody UserDto userDto) {
//		logger.info("modifyUserInfo - 호출");
//
//		HttpStatus status = HttpStatus.ACCEPTED;
//		boolean flag = false;
//
//		// 회원 정보 조회
//		UserDto dto = new UserDto();
//		dto.setEmail(userDto.get("email"));
//		dto.setNickname(userDto.get("nickname"));
//
//		// 회원 소개 수정
//		try {
//			flag = userService.modifyUserInfo(dto);
//			status = HttpStatus.ACCEPTED;
//		} catch (Exception e) {
//			e.printStackTrace();
//			status = HttpStatus.INTERNAL_SERVER_ERROR;
//		}
//
//		return new ResponseEntity<Boolean>(flag, status);
//	}

//	@GetMapping("payment/list")
//	public ResponseEntity<List<PaymentDto>> findUserPayment(@RequestParam int userId) {
//		logger.info("findUserPayment - 호출, " + userId);
//		List<PaymentDto> paymentList = paymentService.findUserPayment(userId);
////		for (PaymentDto x : paymentList) {
////			String store_name = reviewService.findStoreName(x.findId_store());
////			x.setStore_name(store_name);
////		}
//
//		return new ResponseEntity<List<PaymentDto>>(paymentList, HttpStatus.OK);
//	}

	@ApiOperation(value = "회원 정지", notes = "회원들을 정지 처리하여 성공 여부에 따라 true, false를 반환한다.", response = Boolean.class)
	@PutMapping("/ban")
	public ResponseEntity<Boolean> banUser(@RequestBody int[] userIds) {
		logger.info("banUser - 호출");

		HttpStatus status = HttpStatus.ACCEPTED;
		boolean flag = false;

		// 회원 탈퇴
		try {
			for (int userId : userIds) {
				int active = userService.banUser(userId);
				if (active == 0) {
					return new ResponseEntity<Boolean>(false, HttpStatus.NO_CONTENT);
				}
			}
			flag = true;
			status = HttpStatus.ACCEPTED;
		} catch (Exception e) {
			e.printStackTrace();
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Boolean>(flag, status);
	}

	@ApiOperation(value = "회원 탈퇴 처리", notes = "회원들을 탈퇴 처리하여 성공 여부에 따라 true, false를 반환한다.", response = Boolean.class)
	@PutMapping("/delete")
	public ResponseEntity<Boolean> deleteUser(@RequestBody int[] userIds) {
		logger.info("deleteUser - 호출");

		HttpStatus status = HttpStatus.ACCEPTED;
		boolean flag = false;

		// 회원 탈퇴
		try {
			for (int userId : userIds) {
				int active = userService.deleteUser(userId);
				if (active == 0) {
					return new ResponseEntity<Boolean>(false, HttpStatus.NO_CONTENT);
				}
			}
			flag = true;
			status = HttpStatus.ACCEPTED;
		} catch (Exception e) {
			e.printStackTrace();
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Boolean>(flag, status);
	}

}