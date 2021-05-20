package com.web.shinhan.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import com.web.shinhan.model.GugunDto;
import com.web.shinhan.model.PaymentDto;
import com.web.shinhan.model.SidoDto;
import com.web.shinhan.model.StoreDto;
import com.web.shinhan.model.service.AreaService;
import com.web.shinhan.model.service.PaymentService;
import com.web.shinhan.model.service.PaymentitemService;
import com.web.shinhan.model.service.StoreService;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/store")
@CrossOrigin(origins = {"*"})
public class StoreController {

  public static final Logger logger = LoggerFactory.getLogger(StoreController.class);

  @Autowired
  StoreService storeService;

  @Autowired
  PaymentService paymentService;

  @Autowired
  PaymentitemService paymentitemService;

  @Autowired
  AreaService areaService;

  @ApiOperation(value = "가맹점 판매 내역", notes = "가맹점의 판매 내역을 가지고 온다.", response = HashMap.class)
  @GetMapping("/payment")
  public ResponseEntity<Map<String, Object>> findStorePayment(@RequestParam int storeId,
      Pageable pageable) throws Exception {
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

  @ApiOperation(value = "시/도", notes = "시/도", response = HashMap.class)
  @GetMapping("/sido")
  public ResponseEntity<Map<String, Object>> sidoCode() throws Exception {
    logger.info("sidoCode - 호출");

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try {
      List<SidoDto> sido = areaService.findSidoAll();
      resultMap.put("sido", sido);
      status = HttpStatus.ACCEPTED;
    } catch (RuntimeException e) {
      resultMap.put("message", e.getMessage());
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity<Map<String, Object>>(resultMap, status);
  }

  @ApiOperation(value = "구/군", notes = "구/군", response = HashMap.class)
  @GetMapping("/gugun")
  public ResponseEntity<Map<String, Object>> gugunCode(@RequestParam String sidoCode)
      throws Exception {
    logger.info("gugunCode - 호출");

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try {
      List<GugunDto> gugun = areaService.findGugun(sidoCode);
      resultMap.put("gugun", gugun);
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
      if (!storeService.checkCrNum(store.getCrNum())) {
        storeService.registStore(store);
        status = HttpStatus.ACCEPTED;
      } else {
        flag = false;
        status = HttpStatus.UNAUTHORIZED;
        return new ResponseEntity<Boolean>(flag, status);
      }
    } catch (Exception e) {
      e.printStackTrace();
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity<Boolean>(flag, status);
  }

  @ApiOperation(value = "이메일 중복 체크", notes = "같은 이메일로 가입한 사용자가 있는지 확인한다.", response = Boolean.class)
  @PostMapping("/check/email")
  public ResponseEntity<Boolean> emailCheck(@RequestParam String email) {
    logger.info("emailCheck - 호출");

    HttpStatus status = HttpStatus.ACCEPTED;

    return new ResponseEntity<Boolean>(storeService.emailCheck(email), status);
  }

  @ApiOperation(value = "거래 내역/미 정산금", notes = "거래 내역/미 정산금을 가지고 온다.", response = HashMap.class)
  @GetMapping("/payment/total")
  public ResponseEntity<Map<String, Object>> findTransactionalInfo(@RequestParam int storeId)
      throws Exception {
    logger.info("findTransactionalInfo - 호출");

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

  @ApiOperation(value = "영수증", notes = "영수증을 가지고 온다.", response = HashMap.class)
  @GetMapping("/payment/single")
  public ResponseEntity<Map<String, Object>> showPayment(@RequestParam int storeId,
      @RequestParam int paymentId) throws Exception {
    logger.info("showPayment - 호출");

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try {
      PaymentDto payment = paymentService.findPayment(paymentId);
      resultMap.put("payment", payment);
      Map<String, Object> items = paymentitemService.findItems(storeId, paymentId);
      resultMap.put("items", items);
      status = HttpStatus.ACCEPTED;
    } catch (RuntimeException e) {
      resultMap.put("message", e.getMessage());
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity<Map<String, Object>>(resultMap, status);
  }

  @ApiOperation(value = "가맹점 판매 상세 내역", notes = "가맹점의 판매 상세 내역을 가지고 온다.", response = HashMap.class)
  @GetMapping("/payment/custom")
  public ResponseEntity<Map<String, Object>> findStorePaymentCustom(@RequestParam int storeId,
      @RequestParam int startDate, @RequestParam int endDate,
      @RequestParam(required = false) boolean forStatistics, Pageable pageable) throws Exception {
    logger.info("findStorePaymentCustom - 호출");
    Map<String, Object> resultMap = new HashMap<>();
    Page<PaymentDto> page = null;
    HttpStatus status = HttpStatus.ACCEPTED;
    pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
        Sort.by(Sort.Direction.DESC, "date"));
    if (forStatistics) {
      pageable = Pageable.unpaged();
    }

    try {
      resultMap.put("info", storeService.findStoreInfo(storeId));
      page = paymentService.findStorePaymentCustom(storeId, pageable, startDate, endDate);
      resultMap.put("paymentList", page);
      status = HttpStatus.ACCEPTED;
    } catch (RuntimeException e) {
      resultMap.put("message", e.getMessage());
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity<Map<String, Object>>(resultMap, status);
  }

}
