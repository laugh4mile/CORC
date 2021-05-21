package com.web.shinhan.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import com.web.shinhan.model.GugunDto;
import com.web.shinhan.model.PaymentDto;
import com.web.shinhan.model.SidoDto;
import com.web.shinhan.model.StoreDto;
import com.web.shinhan.model.UserDto;
import com.web.shinhan.model.service.AreaService;
import com.web.shinhan.model.service.BlockchainService;
import com.web.shinhan.model.service.PaymentService;
import com.web.shinhan.model.service.StoreService;
import com.web.shinhan.model.service.UserService;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = {"*"})
public class AdminController {

  public static final Logger logger = LoggerFactory.getLogger(AdminController.class);

  @Autowired
  UserService userService;

  @Autowired
  StoreService storeService;

  @Autowired
  PaymentService paymentService;

  @Autowired
  AreaService areaService;

  @Autowired
  BlockchainService blockchainService;

  @ApiOperation(value = "회원 목록 조회", notes = "회원들의 정보를 반환한다.", response = HashMap.class)
  @GetMapping("/user/list")
  public ResponseEntity<Map<String, Object>> findUserList(Pageable pageable) throws Exception {
    logger.info("findUserList - 호출");

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.OK;
    Page<UserDto> page = null;

    try {
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
  @GetMapping("/user/info")
  public ResponseEntity<Map<String, Object>> findUserInfo(@RequestParam int userId)
      throws Exception {
    logger.info("findUserInfo - 호출");

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try {
      resultMap.put("info", userService.findUserInfo(userId));
      status = HttpStatus.ACCEPTED;
    } catch (RuntimeException e) {
      resultMap.put("message", e.getMessage());
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity<Map<String, Object>>(resultMap, status);
  }

  @ApiOperation(value = "회원 결제 내역", notes = "회원의 결제 내역을 가지고 온다.", response = HashMap.class)
  @GetMapping("/user/payment")
  public ResponseEntity<Map<String, Object>> findUserPayment(@RequestParam int userId,
      Pageable pageable) throws Exception {
    logger.info("findUserPayment - 호출");

    Map<String, Object> resultMap = new HashMap<>();
    Page<PaymentDto> page = null;
    HttpStatus status = HttpStatus.ACCEPTED;

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

  @ApiOperation(value = "사용자 등록", notes = "입력한 정보를 토대로 DB에 정보를 저장한다.", response = Boolean.class)
  @PostMapping("/user/regist")
  public ResponseEntity<Boolean> registUser(@RequestBody UserDto user) {
    logger.info("registUser - 호출");

    HttpStatus status = HttpStatus.ACCEPTED;
    boolean flag = false;

    user.setAccessTime(LocalDateTime.now());
    user.setLimitTime(LocalDateTime.now().plusDays(30));

    try {
      if (!userService.employeeNumCheck(user.getEmployeeNum())) {
        userService.registUser(user);
        flag = true;
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

  @ApiOperation(value = "회원 상태 변경", notes = "회원들의 상태를 변경하여 성공 여부에 따라 true, false를 반환한다.",
      response = Boolean.class)
  @PutMapping("/user/status")
  public ResponseEntity<Boolean> userStatus(@RequestBody int[] userIds,
      @RequestParam int userStatus) {
    logger.info("userStatus - 호출");

    HttpStatus status = HttpStatus.ACCEPTED;
    boolean flag = false;

    try {
      if (userStatus == 1) {
        for (int userId : userIds) {
          int active = userService.activateUser(userId);
          if (active == 0) {
            return new ResponseEntity<Boolean>(false, HttpStatus.NO_CONTENT);
          }
        }
      } else if (userStatus == 2) {
        for (int userId : userIds) {
          int active = userService.banUser(userId);
          if (active == 0) {
            return new ResponseEntity<Boolean>(false, HttpStatus.NO_CONTENT);
          }
        }
      } else if (userStatus == 0) {
        for (int userId : userIds) {
          int active = userService.deleteUser(userId);
          if (active == 0) {
            return new ResponseEntity<Boolean>(false, HttpStatus.NO_CONTENT);
          }
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

  @ApiOperation(value = "회원 정보 수정", notes = "회원의 정보를 수정한다.", response = Boolean.class)
  @PutMapping("/user/modify/info")
  public ResponseEntity<Boolean> modifyUserInfo(@RequestBody UserDto newDto) {
    logger.info("modifyUserInfo - 호출");

    HttpStatus status = HttpStatus.ACCEPTED;
    boolean flag = false;

    String email = newDto.getEmail();

    try {
      flag = userService.modifyUserInfo(email, newDto);
      status = HttpStatus.ACCEPTED;
    } catch (Exception e) {
      e.printStackTrace();
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity<Boolean>(flag, status);
  }

  @ApiOperation(value = "회원 한도 수정", notes = "회원의 한도를 수정한다.", response = Boolean.class)
  @PutMapping("/user/modify/cardlimit")
  public ResponseEntity<Boolean> modifyCardLimit(@RequestParam int limit,
      @RequestBody int[] userIds) {
    logger.info("modifyCardLimit - 호출");

    HttpStatus status = HttpStatus.ACCEPTED;
    boolean flag = false;

    try {
      for (int userId : userIds) {
        flag = userService.modifyCardLimit(userId, limit);
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

  @ApiOperation(value = "초기화", notes = "선택된 유저의 잔액을 초기화한다.", response = Boolean.class)
  @PutMapping("/user/reset")
  public ResponseEntity<Boolean> resetBalance(@RequestBody int[] userIds) {
    logger.info("resetBalance - 호출 ");

    HttpStatus status = HttpStatus.ACCEPTED;
    boolean flag = false;

    try {
      for (int userId : userIds) {
        flag = userService.resetBalance(userId);
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

  @ApiOperation(value = "결제 내역", notes = "모든 결제 내역을 반환한다.", response = HashMap.class)
  @GetMapping("/payment")
  public ResponseEntity<Map<String, Object>> findAllPayment(Pageable pageable) {
    logger.info("findAllPayment - 호출 ");

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.OK;
    Page<PaymentDto> page = null;

    try {
      page = paymentService.findAll(pageable);
      resultMap.put("paymentList", page);
      status = HttpStatus.OK;
    } catch (Exception e) {
      resultMap.put("message", e.getMessage());
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity<Map<String, Object>>(resultMap, status);
  }

  @ApiOperation(value = "정산", notes = "선택된 가맹점의 미정산 금액을 정산한다.", response = Boolean.class)
  @PutMapping("/payment/confirm")
  public ResponseEntity<Boolean> confirmPayment(@RequestBody int[] storeIds) {
    logger.info("confirmPayment - 호출 ");

    HttpStatus status = HttpStatus.ACCEPTED;
    boolean flag = false;

    try {
      for (int storeId : storeIds) {
        flag = paymentService.confirmPayment(storeId);
        if (!flag) {
          return new ResponseEntity<Boolean>(false, HttpStatus.NO_CONTENT);
        }
      }
      status = HttpStatus.ACCEPTED;
    } catch (Exception e) {
      e.printStackTrace();
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      flag = false;
    }

    return new ResponseEntity<Boolean>(flag, status);
  }

  @ApiOperation(value = "정산", notes = "선택된 가맹점의 미정산 금액을 정산한다.", response = Boolean.class)
  @PutMapping("/payment/status")
  public ResponseEntity<Boolean> paymentStatus(@RequestBody List<Integer> paymentIds,
      @RequestParam int paymentStatus) {
    logger.info("paymentStatus - 호출 ");

    HttpStatus status = HttpStatus.ACCEPTED;
    boolean flag = false;

    try {
      if (paymentIds.size() != 0) {
        paymentService.multiPayment(paymentIds, paymentStatus);
      } else {
        return new ResponseEntity<Boolean>(false, HttpStatus.NO_CONTENT);
      }
      flag = true;
      status = HttpStatus.ACCEPTED;
    } catch (Exception e) {
      e.printStackTrace();
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity<Boolean>(flag, status);
  }

  @ApiOperation(value = "가맹점 목록 조회", notes = "가맹점들의 정보를 반환한다.", response = HashMap.class)
  @GetMapping("/store/list")
  public ResponseEntity<Map<String, Object>> findStoreList(Pageable pageable) throws Exception {
    logger.info("findStoreList - 호출");

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.OK;
    Page<StoreDto> page = null;

    try {
      page = storeService.findAllStore(pageable);
      resultMap.put("storeLists", page);
      status = HttpStatus.OK;
    } catch (Exception e) {
      resultMap.put("message", e.getMessage());
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity<Map<String, Object>>(resultMap, status);
  }

  @ApiOperation(value = "가맹점 신청 목록", notes = "신청 대기 중인 가맹점들의 정보를 반환한다.", response = HashMap.class)
  @GetMapping("/store/list/unassigned")
  public ResponseEntity<Map<String, Object>> findUnassignedStoreList(Pageable pageable)
      throws Exception {
    logger.info("findUnassignedStoreList - 호출");

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.OK;
    Page<StoreDto> page = null;

    try {
      page = storeService.findAllUnassignedStore(pageable);
      resultMap.put("storeLists", page);
      status = HttpStatus.OK;
    } catch (Exception e) {
      resultMap.put("message", e.getMessage());
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity<Map<String, Object>>(resultMap, status);
  }

  @ApiOperation(value = "가맹점 정보 조회", notes = "가맹점의 정보를 가지고 온다.", response = HashMap.class)
  @GetMapping("/store/info")
  public ResponseEntity<Map<String, Object>> findStoreInfo(@RequestParam int storeId)
      throws Exception {
    logger.info("findStoreInfo - 호출");

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try {
      resultMap.put("info", storeService.findStoreInfo(storeId));
      status = HttpStatus.ACCEPTED;
    } catch (RuntimeException e) {
      resultMap.put("message", e.getMessage());
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity<Map<String, Object>>(resultMap, status);
  }

  @ApiOperation(value = "가맹점 결제 내역", notes = "가맹점의 결제 내역을 가지고 온다.", response = HashMap.class)
  @GetMapping("/store/payment")
  public ResponseEntity<Map<String, Object>> findStorePayment(@RequestParam int storeId,
      Pageable pageable) throws Exception {
    logger.info("findStorePayment - 호출");

    Map<String, Object> resultMap = new HashMap<>();
    Page<PaymentDto> page = null;
    HttpStatus status = HttpStatus.ACCEPTED;

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
  @PostMapping("/store/regist")
  public ResponseEntity<Boolean> registStore(@RequestBody StoreDto store) {
    logger.info("registStore - 호출");

    HttpStatus status = HttpStatus.ACCEPTED;
    boolean flag = false;

    try {
      storeService.registStore(store);
      flag = true;
      status = HttpStatus.ACCEPTED;
    } catch (Exception e) {
      e.printStackTrace();
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity<Boolean>(flag, status);
  }

  @ApiOperation(value = "가맹점 정보 수정", notes = "가맹점의 정보를 수정한다.", response = Boolean.class)
  @PutMapping("/store/modify")
  public ResponseEntity<Boolean> modifyStoreInfo(@RequestBody StoreDto newDto) {
    logger.info("modifyStoreInfo - 호출");

    HttpStatus status = HttpStatus.ACCEPTED;
    boolean flag = false;

    String email = newDto.getEmail();

    try {
      flag = storeService.modifyStoreInfo(email, newDto);
      status = HttpStatus.ACCEPTED;
    } catch (Exception e) {
      e.printStackTrace();
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity<Boolean>(flag, status);
  }

  @ApiOperation(value = "가맹점 상태 처리", notes = "가맹점들의 상태를 처리하여 성공 여부에 따라 true, false를 반환한다.",
      response = Boolean.class)
  @PutMapping("/store/status")
  public ResponseEntity<Boolean> storeApplication(@RequestBody int[] storeIds,
      @RequestParam int storeStatus) {
    logger.info("allowStoreApplication - 호출");

    HttpStatus status = HttpStatus.ACCEPTED;
    boolean flag = false;

    try {
      if (storeIds.length != 0) {
        if (storeStatus == 2) {
          for (int userId : storeIds) {
            storeService.allowStoreApplication(userId);
          }
        } else if (storeStatus == 0) {
          for (int storeId : storeIds) {
            storeService.denyStoreApplication(storeId);
          }
        }
      } else {
        return new ResponseEntity<Boolean>(false, HttpStatus.NO_CONTENT);
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
