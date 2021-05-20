package com.web.shinhan.controller;

import java.time.LocalDateTime;
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
import com.web.shinhan.model.PaymentDto;
import com.web.shinhan.model.PaymentitemDto;
import com.web.shinhan.model.StoreDto;
import com.web.shinhan.model.UserDto;
import com.web.shinhan.model.service.BlockchainService;
import com.web.shinhan.model.service.PaymentService;
import com.web.shinhan.model.service.PaymentitemService;
import com.web.shinhan.model.service.StoreService;
import com.web.shinhan.model.service.UserService;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {"*"})
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

  @Autowired
  BlockchainService blockchainService;

  @ApiOperation(value = "회원 결제 내역", notes = "회원의 결제 내역을 가지고 온다.", response = HashMap.class)
  @GetMapping("/payment")
  public ResponseEntity<Map<String, Object>> findUserPayment(@RequestParam int userId,
      Pageable pageable) throws Exception {
    logger.info("findUserPayment - 호출");

    Map<String, Object> resultMap = new HashMap<>();
    Page<PaymentDto> page = null;
    HttpStatus status = HttpStatus.ACCEPTED;
    pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
        Sort.by(Sort.Direction.DESC, "date"));

    try {
      page = paymentService.findUserPayment(userId, pageable);
      resultMap.put("paymentList", page);
      status = HttpStatus.ACCEPTED;
    } catch (RuntimeException e) {
      resultMap.put("message", e.getMessage());
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity<Map<String, Object>>(resultMap, status);
  }

  @ApiOperation(value = "회원 결제 상세 내역", notes = "회원의 결제 상세 내역을 가지고 온다.", response = HashMap.class)
  @GetMapping("/payment/custom")
  public ResponseEntity<Map<String, Object>> findUserPaymentCustom(@RequestParam int userId,
      @RequestParam int startDate, @RequestParam int endDate,
      @RequestParam(required = false) boolean forStatistics, Pageable pageable) throws Exception {
    logger.info("findUserPaymentCustom - 호출");

    Map<String, Object> resultMap = new HashMap<>();
    Page<PaymentDto> page = null;
    HttpStatus status = HttpStatus.ACCEPTED;
    pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
        Sort.by(Sort.Direction.DESC, "date"));

    if (forStatistics) {
      pageable = Pageable.unpaged();
    }

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

  @ApiOperation(value = "영수증", notes = "영수증을 가지고 온다.", response = HashMap.class)
  @GetMapping("/payment/single")
  public ResponseEntity<Map<String, Object>> showPayment(@RequestParam int storeId,
      @RequestParam int paymentId) throws Exception {
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

  @ApiOperation(value = "결제", notes = "결제를 하여 영수증을 만든다.", response = HashMap.class)
  @PostMapping("/pay")
  public ResponseEntity<Map<String, Object>> pay(@RequestParam int total, @RequestParam int userId,
      @RequestParam int storeId, @RequestBody List<PaymentitemDto> paymentitems) throws Exception {
    logger.info("pay - 호출");

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try {
      int itemsTotal = 0;
      for (PaymentitemDto paymentitem : paymentitems) {
        itemsTotal += paymentitem.getPrice() * paymentitem.getAmount();
      }
      if (itemsTotal == total) {
        UserDto user = userService.findUserInfo(userId);
        StoreDto store = storeService.findStoreInfo(storeId);
        String storeGugunCode = store.getGugunCode();
        String userGugunCode = user.getGugunCode();
        String userDays = user.getDays();
        LocalDateTime now = LocalDateTime.now();
        int nowDay = now.getDayOfWeek().getValue();
        if (userDays.substring(nowDay - 1, nowDay).equals("1")) {
          if (store.getAccepted() == 2 && user.getActive() == 1) {
            if (storeGugunCode.equals(userGugunCode)) {
              if (!userService.pay(userId, total)) {
                status = HttpStatus.UNAUTHORIZED;
                resultMap.put("message", "잔고 부족");
                return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.UNAUTHORIZED);
              } else {
                paymentService.pay(userId, storeId, total, paymentitems);
                resultMap.put("message", "결제 완료");
                status = HttpStatus.ACCEPTED;
              }
            } else {
              resultMap.put("message", "사용 불가 지역");
              return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.UNAUTHORIZED);
            }
          } else {
            resultMap.put("message", "사용 불가 요일");
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.UNAUTHORIZED);
          }
        } else {
          resultMap.put("message", "사용 불가 사용자/가맹점");
          return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.UNAUTHORIZED);
        }
      } else {
        resultMap.put("message", "결제 내역 총합과 상품 목록 총합 불일치");
        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.UNAUTHORIZED);
      }
    } catch (RuntimeException e) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity<Map<String, Object>>(resultMap, status);
  }

}
