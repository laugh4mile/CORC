package com.web.shinhan.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
import com.web.shinhan.model.UserDto;
import com.web.shinhan.model.service.PaymentService;
import com.web.shinhan.model.service.PaymentitemService;
import com.web.shinhan.model.service.StoreService;
import com.web.shinhan.model.service.UserService;
import com.web.shinhan.repository.PaymentRepository;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = { "*" })
public class UserController {

	public static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	UserService userService;

	@Autowired
	StoreService storeService;

	@Autowired
	PaymentService paymentService;

	@Autowired
	PaymentitemService paymentitemService;

	@ApiOperation(value = "회원 결제 내역", notes = "회원의 결제 내역을 가지고 온다.", response = HashMap.class)
	@GetMapping("/payment")
	public ResponseEntity<Map<String, Object>> findUserPayment(@RequestParam int userId, Pageable pageable)
			throws Exception {
		logger.info("findUserPayment - 호출");

		Map<String, Object> resultMap = new HashMap<>();
		Page<PaymentDto> page = null;
		HttpStatus status = HttpStatus.ACCEPTED;
		pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
				Sort.by(Sort.Direction.DESC, "date"));

		try {
			resultMap.put("info", userService.findUserInfo(userId));
			page = paymentService.findUserPayment(userId, pageable);
			resultMap.put("paymentList", page);
			status = HttpStatus.ACCEPTED;
		} catch (RuntimeException e) {
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@ApiOperation(value = "회원 결제 내역", notes = "회원의 결제 내역을 가지고 온다.", response = HashMap.class)
	@GetMapping("/payment/custom")
	public ResponseEntity<Map<String, Object>> findUserPaymentCustom(@RequestParam int userId,
			@RequestParam int startDate, @RequestParam int endDate, Pageable pageable) throws Exception {
		logger.info("findUserPaymentCustom - 호출");

		Map<String, Object> resultMap = new HashMap<>();
		Page<PaymentDto> page = null;
		HttpStatus status = HttpStatus.ACCEPTED;
		pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
				Sort.by(Sort.Direction.DESC, "date"));

		try {
			resultMap.put("info", userService.findUserInfo(userId));
			page = paymentService.findUserPaymentCustom(userId, pageable, startDate, endDate);
			resultMap.put("paymentList", page);
			status = HttpStatus.ACCEPTED;
		} catch (RuntimeException e) {
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@ApiOperation(value = "가맹점 결제 내역", notes = "가맹점의 결제 내역을 가지고 온다.", response = HashMap.class)
	@GetMapping("/payment/single")
	public ResponseEntity<Map<String, Object>> showPayment(@RequestParam int storeId, @RequestParam int paymentId)
			throws Exception {
		logger.info("showPayment - 호출");

		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;

		try {
			Map<String, Object> items = paymentitemService.findItems(storeId, paymentId);
			resultMap.put("items", items);
			StoreDto storeInfo = storeService.findStoreInfo(storeId);
			resultMap.put("storeInfo", storeInfo);
			status = HttpStatus.ACCEPTED;
		} catch (RuntimeException e) {
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@ApiOperation(value = "가맹점 결제 내역", notes = "가맹점의 결제 내역을 가지고 온다.", response = HashMap.class)
	@PostMapping("/pay")
	public ResponseEntity<Boolean> pay(@RequestParam int bill, @RequestParam int userId, @RequestParam int storeId) throws Exception {
		logger.info("pay - 호출");

		HttpStatus status = HttpStatus.ACCEPTED;
		boolean flag = false;

		try {
			paymentService.pay(userId, storeId, bill);
			userService.pay(userId, bill);
			flag = true;
			status = HttpStatus.ACCEPTED;
		} catch (RuntimeException e) {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Boolean>(flag, status);
	}

}