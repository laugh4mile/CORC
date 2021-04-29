package com.web.shinhan.controller;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.shinhan.entity.Payment;
import com.web.shinhan.model.PaymentDto;
import com.web.shinhan.model.StoreDto;
import com.web.shinhan.model.UserDto;
import com.web.shinhan.model.service.PaymentService;
import com.web.shinhan.model.service.StoreService;
import com.web.shinhan.model.service.UserService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/board")
@CrossOrigin(origins = { "*" })
public class BoardController {

	public static final Logger logger = LoggerFactory.getLogger(BoardController.class);

	@Autowired
	UserService userService;

	@Autowired
	StoreService storeService;

	@Autowired
	PaymentService paymentService;

	@ApiOperation(value = "가맹점 신청 현황", notes = "가맹점 신청 현황을 반환한다.", response = HashMap.class)
	@GetMapping("/store/unassigned")
	public ResponseEntity<Map<String, Object>> unassignedStoreList(Pageable pageable) throws Exception {
		logger.info("unassignedStoreList - 호출");

		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.OK;
		Page<StoreDto> page = null;

		// 회원 정보 조회
		try {
			page = storeService.findAllUnassignedStore(pageable);
			resultMap.put("storeList", page);
			status = HttpStatus.OK;
		} catch (Exception e) {
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@ApiOperation(value = "실시간 결제 현황", notes = "실시간 결제 현황 정보를 가지고 온다.", response = HashMap.class)
	@GetMapping("payment/recent")
	public ResponseEntity<Map<String, Object>> recentPayment(Pageable pageable, HttpServletRequest req)
			throws Exception {
		logger.info("recentPayment - 호출");

		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
				Sort.by(Sort.Direction.DESC, "date"));

		// 회원 정보 조회
		try {
			resultMap.put("payment", paymentService.findAll(pageable));
			status = HttpStatus.ACCEPTED;
		} catch (RuntimeException e) {
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@ApiOperation(value = "부서별 결제 금액", notes = "부서별 결제 금액을 가지고 온다.", response = HashMap.class)
	@GetMapping("/payment/department")
	public ResponseEntity<Map<String, Object>> findDeptPayment(@RequestParam String department, Pageable pageable,
			HttpServletRequest req) throws Exception {
		logger.info("findDeptPayment - 호출");

		Map<String, Object> resultMap = new HashMap<>();
		Page<PaymentDto> page = null;
		HttpStatus status = HttpStatus.ACCEPTED;

		try {
			page = paymentService.findDepartmentPayment(department, pageable);
			resultMap.put("paymentList", page);
			status = HttpStatus.ACCEPTED;
		} catch (RuntimeException e) {
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

//	@ApiOperation(value = "사용된 금액", notes = "", response = HashMap.class)
//	@GetMapping("/expenses")
//	public ResponseEntity<Map<String, Object>> expenses() {
//		logger.info("expenses - 호출");
//
//		Map<String, Object> resultMap = new HashMap<>();
//		HttpStatus status = HttpStatus.ACCEPTED;
//
//		try {
//			int total = paymentService.calcTotalExpense();
//			resultMap.put("total", total);
//			int notConfirmed = paymentService.notConfirmedExpense();
//			resultMap.put("notConfirmed", total);
//			status = HttpStatus.ACCEPTED;
//		} catch (RuntimeException e) {
//			resultMap.put("message", e.getMessage());
//			status = HttpStatus.INTERNAL_SERVER_ERROR;
//		}
//
//		return new ResponseEntity<Map<String, Object>>(resultMap, status);
//	}

	@ApiOperation(value = "월간 소비량", notes = "회원의 정보를 수정한다.")
	@GetMapping("/expense/month")
	public ResponseEntity<Map<Integer, Object>> expenseByMonth() throws ParseException {
		logger.info("expenseByMonth - 호출");
//		@RequestParam String date
		Map<Integer, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		LocalDateTime now = LocalDateTime.now();
		int year = now.getYear();

		try {
			for (int i = 1; i <= 12; i++) {
				List<PaymentDto> payment = paymentService.expenseByMonth(i, year);
				resultMap.put(i, payment);
			}
			status = HttpStatus.ACCEPTED;
		} catch (RuntimeException e) {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Map<Integer, Object>>(resultMap, status);
	}

	@ApiOperation(value = "소비 품목 현황", notes = "모든 결제 내역을 반환한다.", response = Boolean.class)
	@GetMapping("/expense/category")
	public ResponseEntity<List<PaymentDto>> expenseByCategory() {
		logger.info("findPayment - 호출, ");

		List<PaymentDto> paymentList = paymentService.expenseByCategory();

		return new ResponseEntity<List<PaymentDto>>(paymentList, HttpStatus.OK);
	}

}