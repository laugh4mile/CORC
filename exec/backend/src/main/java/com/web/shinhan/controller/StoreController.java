package com.web.shinhan.controller;

import java.util.HashMap;
import java.util.List;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.shinhan.model.PaymentDto;
import com.web.shinhan.model.PaymentitemDto;
import com.web.shinhan.model.StoreDto;
import com.web.shinhan.model.service.PaymentService;
import com.web.shinhan.model.service.PaymentitemService;
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

	@Autowired
	PaymentitemService paymentitemService;

	@ApiOperation(value = "가맹점 결제 내역", notes = "가맹점의 결제 내역을 가지고 온다.", response = HashMap.class)
	@GetMapping("/payment")
	public ResponseEntity<Map<String, Object>> findStorePayment(@RequestParam int storeId, Pageable pageable)
			throws Exception {
		logger.info("findUserPayment - 호출");

		Map<String, Object> resultMap = new HashMap<>();
		Page<PaymentDto> page = null;
		HttpStatus status = HttpStatus.ACCEPTED;
		pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
				Sort.by(Sort.Direction.DESC, "date"));

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

	@ApiOperation(value = "가맹점 등록", notes = "입력한 정보를 토대로 DB에 정보를 저장한다.", response = Boolean.class)
	@PostMapping("/regist")
	public ResponseEntity<Boolean> registStore(@RequestBody StoreDto store) {
		logger.info("registStore - 호출");

		HttpStatus status = HttpStatus.ACCEPTED;
		boolean flag = true;

		try {
			storeService.registStore(store);
			status = HttpStatus.ACCEPTED;
		} catch (Exception e) {
			e.printStackTrace();
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Boolean>(flag, status);
	}

	@ApiOperation(value = "가맹점 결제 내역", notes = "가맹점의 결제 내역을 가지고 온다.", response = HashMap.class)
	@GetMapping("/payment/total")
	public ResponseEntity<Map<String, Object>> findTransactionalInfo(@RequestParam int storeId) throws Exception {
		logger.info("findStoreTotal - 호출");

		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;

		try {
			int total = paymentService.findTotal(storeId);
			resultMap.put("total", total);
			int notConfirmed = paymentService.findNotConfirmed(storeId);
			resultMap.put("notConfirmed", notConfirmed);
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
			List<PaymentitemDto> items = paymentitemService.findItems(storeId, paymentId);
			resultMap.put("items", items);
			status = HttpStatus.ACCEPTED;
		} catch (RuntimeException e) {
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

}