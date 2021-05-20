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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.web.shinhan.model.AdminDto;
import com.web.shinhan.model.StoreDto;
import com.web.shinhan.model.UserDto;
import com.web.shinhan.model.service.JwtService;
import com.web.shinhan.model.service.StoreService;
import com.web.shinhan.model.service.UserService;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = {"*"})
public class LoginController {

  public static final Logger logger = LoggerFactory.getLogger(LoginController.class);

  @Autowired
  private JwtService jwtService;

  @Autowired
  private UserService userService;

  @Autowired
  private StoreService storeService;

  @ApiOperation(value = "웹 로그인", notes = "DB에서 정보를 조회하여 로그인 정보와 일치하면 로그인한다.", response = HashMap.class)
  @PostMapping("/web")
  public ResponseEntity<Map<String, Object>> webLogin(@RequestBody AdminDto admin) {
    logger.info("webLogin - 호출");

    HttpStatus status = null;
    Map<String, Object> resultMap = new HashMap<>();

    try {
      boolean loginUser = userService.loginAdmin(admin);
      if (loginUser) {
        // jwt.io에서 확인
        // 로그인 성공했다면 토큰을 생성한다
        String token = jwtService.createAdmin(admin);
        logger.trace("로그인 토큰정보 : {}", token);

        // 토큰 정보는 response의 헤더로 보내고 나머지는 Map에 담는다
        resultMap.put("auth-token", token);
        resultMap.put("admin-email", admin.getEmail());
        status = HttpStatus.ACCEPTED;
      } else {
        resultMap.put("message", "로그인 실패");
        status = HttpStatus.UNAUTHORIZED;
      }
    } catch (Exception e) {
      logger.error("로그인 실패 : {}", e);
      resultMap.put("message", e.getMessage());
      status = HttpStatus.INTERNAL_SERVER_ERROR;

    }
    return new ResponseEntity<Map<String, Object>>(resultMap, status);
  }

  @ApiOperation(value = "사용자 앱 로그인", notes = "DB에서 정보를 조회하여 로그인 정보와 일치하면 로그인한다.", response = HashMap.class)
  @PostMapping("/user")
  public ResponseEntity<Map<String, Object>> userLogin(@RequestParam String email,
      @RequestParam String password) {
    logger.info("userLogin - 호출");

    HttpStatus status = null;
    Map<String, Object> resultMap = new HashMap<>();

    UserDto dto = new UserDto();
    dto.setEmail(email);
    dto.setPassword(password);
    dto.setAccessTime(LocalDateTime.now());
    // 로그인
    try {
      boolean loginUser = userService.login(dto);
      if (loginUser) {
        UserDto user = userService.findUserByEmail(email);
        // jwt.io에서 확인
        // 로그인 성공했다면 토큰을 생성한다
        String token = jwtService.create(dto);
        logger.trace("로그인 토큰정보 : {}", token);

        // 토큰 정보는 response의 헤더로 보내고 나머지는 Map에 담는다
        resultMap.put("auth-token", token);
        resultMap.put("user-email", email);
        resultMap.put("user-userid", user.getUserId());
        status = HttpStatus.ACCEPTED;
      } else {
        resultMap.put("message", "로그인 실패");
        status = HttpStatus.UNAUTHORIZED;
      }
    } catch (Exception e) {
      logger.error("로그인 실패 : {}", e);
      resultMap.put("message", e.getMessage());
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity<Map<String, Object>>(resultMap, status);
  }

  @ApiOperation(value = "가맹점 앱 로그인", notes = "DB에서 정보를 조회하여 로그인 정보와 일치하면 로그인한다.", response = HashMap.class)
  @PostMapping("/store")
  public ResponseEntity<Map<String, Object>> storeLogin(@RequestParam String email,
      @RequestParam String password) {
    logger.info("storeLogin - 호출");

    HttpStatus status = null;
    Map<String, Object> resultMap = new HashMap<>();

    StoreDto dto = new StoreDto();
    dto.setEmail(email);
    dto.setPassword(password);
    // 로그인
    try {
      boolean login = storeService.login(dto);
      if (login) {
        StoreDto store = storeService.findStoreByEmail(email);
        // jwt.io에서 확인
        // 로그인 성공했다면 토큰을 생성한다
        String token = jwtService.createStore(dto);
        logger.trace("로그인 토큰정보 : {}", token);

        // 토큰 정보는 response의 헤더로 보내고 나머지는 Map에 담는다
        resultMap.put("auth-token", token);
        resultMap.put("store-email", email);
        resultMap.put("store-storeid", store.getStoreId());
        resultMap.put("store-accepted", store.getAccepted());
        status = HttpStatus.ACCEPTED;
      } else {
        resultMap.put("message", "로그인 실패");
        status = HttpStatus.UNAUTHORIZED;
      }
    } catch (Exception e) {
      logger.error("로그인 실패 : {}", e);
      resultMap.put("message", e.getMessage());
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity<Map<String, Object>>(resultMap, status);
  }

}
