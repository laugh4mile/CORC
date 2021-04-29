package com.web.shinhan.controller;

import java.util.HashMap;
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
import com.web.shinhan.model.StoreDto;
import com.web.shinhan.model.service.PaymentService;
import com.web.shinhan.model.service.StoreService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/store")
@CrossOrigin(origins = { "*" })
public class StoreController {

	public static final Logger logger = LoggerFactory.getLogger(StoreController.class);

	@Autowired
	StoreService storeService;

	@Autowired
	PaymentService paymentService;

	@ApiOperation(value = "가맹점 목록 조회", notes = "회원들의 정보를 반환한다.", response = HashMap.class)
	@GetMapping("/list")
	public ResponseEntity<Map<String, Object>> findStoreList(@RequestParam String email, Pageable pageable)
			throws Exception {
		logger.info("findMembers - 호출");

		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.OK;
		Page<StoreDto> page = null;

		// 회원 정보 조회
		try {
			if (!email.equals("admin@admin.com")) {
				resultMap.put("message", "Not a Admin Account");
				status = HttpStatus.METHOD_NOT_ALLOWED;
				return new ResponseEntity<Map<String, Object>>(resultMap, status);
			}
			page = storeService.findAllStore(pageable);
			resultMap.put("userList", page);
			status = HttpStatus.OK;
		} catch (Exception e) {
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@ApiOperation(value = "회원 정보 조회", notes = "회원의 정보를 가지고 온다.", response = HashMap.class)
	@GetMapping("/info")
	public ResponseEntity<Map<String, Object>> findStoreInfo(@RequestParam int userId, HttpServletRequest req)
			throws Exception {
		logger.info("findUserInfo - 호출");

		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;

		// 회원 정보 조회
		try {
			resultMap.put("info", storeService.findStoreInfo(userId));
			status = HttpStatus.ACCEPTED;
		} catch (RuntimeException e) {
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@ApiOperation(value = "회원 결제 내역", notes = "회원의 결제 내역을 가지고 온다.", response = HashMap.class)
	@GetMapping("/payment")
	public ResponseEntity<Map<String, Object>> findStorePayment(@RequestParam int storeId, Pageable pageable,
			HttpServletRequest req) throws Exception {
		logger.info("findUserPayment - 호출");

		Map<String, Object> resultMap = new HashMap<>();
		Page<PaymentDto> page = null;
		HttpStatus status = HttpStatus.ACCEPTED;

		// 회원 정보 조회
		try {
			resultMap.put("info", storeService.findStoreInfo(storeId));
			page = paymentService.findStorePayment(storeId, pageable);
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
	public ResponseEntity<Boolean> registStore(@RequestBody StoreDto store) {
		logger.info("regist - 호출");

		HttpStatus status = HttpStatus.ACCEPTED;
		boolean flag = true;

		// 회원 정보 담기
//		store.setAccessTime(LocalDateTime.now());

		// 회원가입
		try {
			storeService.registStore(store);
			status = HttpStatus.ACCEPTED;
		} catch (Exception e) {
			e.printStackTrace();
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Boolean>(flag, status);
	}

	@ApiOperation(value = "회원 정보 수정", notes = "회원의 정보를 수정한다.", response = Boolean.class)
	@PutMapping("/modify")
	public ResponseEntity<Boolean> modifyStoreInfo(@RequestBody StoreDto newDto) {
		logger.info("modifyStoreInfo - 호출");

		HttpStatus status = HttpStatus.ACCEPTED;
		boolean flag = false;

		// 회원 정보 조회
		String email = newDto.getEmail();
		// 회원 소개 수정
		try {
			flag = storeService.modifyStoreInfo(email, newDto);
			status = HttpStatus.ACCEPTED;
		} catch (Exception e) {
			e.printStackTrace();
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Boolean>(flag, status);
	}

	@ApiOperation(value = "회원 정지", notes = "회원들을 정지 처리하여 성공 여부에 따라 true, false를 반환한다.", response = Boolean.class)
	@PutMapping("/allow")
	public ResponseEntity<Boolean> allowStoreApplication(@RequestBody int[] storeIds) {
		logger.info("allowStoreApplication - 호출");

		HttpStatus status = HttpStatus.ACCEPTED;
		boolean flag = false;

		// 회원 탈퇴
		try {
			for (int userId : storeIds) {
				int active = storeService.allowStoreApplication(userId);
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

	@ApiOperation(value = "가맹점  신청 거부", notes = "회원들을 탈퇴 처리하여 성공 여부에 따라 true, false를 반환한다.", response = Boolean.class)
	@PutMapping("/deny")
	public ResponseEntity<Boolean> denyStoreApplication(@RequestBody int[] storeIds) {
		logger.info("denyStoreApplication - 호출");

		HttpStatus status = HttpStatus.ACCEPTED;
		boolean flag = false;

		// 회원 탈퇴
		try {
			for (int storeId : storeIds) {
				int active = storeService.denyStoreApplication(storeId);
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