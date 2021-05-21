package com.web.shinhan.model.service;

import java.util.List;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.web.shinhan.entity.Admin;
import com.web.shinhan.entity.User;
import com.web.shinhan.model.AdminDto;
import com.web.shinhan.model.BlockUserDto;
import com.web.shinhan.model.UserDto;
import com.web.shinhan.model.mapper.UserMapper;
import com.web.shinhan.repository.AdminRepository;
import com.web.shinhan.repository.UserRepository;
import reactor.core.publisher.Mono;

@Service
public class UserService {

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private AdminRepository adminRepository;

  @Autowired
  private BlockchainService blockchainService;

  private final UserMapper mapper = Mappers.getMapper(UserMapper.class);

  @Transactional
  public Page<UserDto> findAllUser(Pageable pageable) {
    Page<User> users = userRepository.findAll(pageable);
    return users.map(post -> {
      UserDto user = UserDto.of(post);
      verifyBlockUser(user);
      return user;
    });
  }

  public UserDto findUserInfo(int userId) {
    User userInfo = userRepository.findByUserId(userId);
    UserDto userDto = mapper.INSTANCE.userToDto(userInfo);
    verifyBlockUser(userDto);
    return userDto;
  }

  public UserDto findUserByEmail(String email) {
    User userInfo = userRepository.findByEmail(email);
    UserDto userDto = mapper.INSTANCE.userToDto(userInfo);
    verifyBlockUser(userDto);
    return userDto;
  }

  @Transactional
  public void registUser(UserDto userDto) {
    String encodePassword = passwordEncoder.encode(userDto.getPassword());
    userDto.setPassword(encodePassword);
    userDto.setBalance(userDto.getCardLimit());
    userDto.setActive(1);
    User userEntity = userDto.toEntity();
    userRepository.save(userEntity);
    userDto.setUserId(userEntity.getUserId());

    // 블록체인 삽입
    createBlockUser(userDto);
  }

  public boolean emailCheck(String email) {
    boolean result = userRepository.existsByEmail(email);
    return result;
  }

  public boolean employeeNumCheck(int employee_num) {
    boolean result = userRepository.existsByEmployeeNum(employee_num);
    return result;
  }

  public boolean modifyUserInfo(String email, UserDto newDto) {
    User userInfo = userRepository.findByEmail(email);
    UserDto userDto = mapper.INSTANCE.userToDto(userInfo);

    String encodePassword = passwordEncoder.encode(newDto.getPassword());
    userDto.setEmployeeNum(newDto.getEmployeeNum());
    userDto.setPassword(encodePassword);
    userDto.setUserName(newDto.getUserName());
    userDto.setDepartment(newDto.getDepartment());
    userDto.setPosition(newDto.getPosition());
    userDto.setContact(newDto.getContact());
    userDto.setDays(newDto.getDays());
    userDto.setSidoCode(newDto.getSidoCode());
    userDto.setGugunCode(newDto.getGugunCode());

    if (userDto.getBalance() >= newDto.getCardLimit()) {
      userDto.setCardLimit(newDto.getCardLimit());
      userDto.setBalance(newDto.getCardLimit());
    } else {
      userDto.setCardLimit(newDto.getCardLimit());
      userDto.setBalance(userDto.getBalance() + (newDto.getCardLimit() - userDto.getCardLimit()));
      userDto.setCardLimit(newDto.getCardLimit());
    }

    userDto.setActive(1);
    userRepository.save(userDto.toEntity());

    newDto.setPassword(encodePassword);
    newDto.setUserId(userDto.getUserId());
    if (newDto.equals(userDto)) {
      return true;
    }
    return false;
  }

  @Transactional
  public boolean modifyCardLimit(int userId, int limit) {
    User user = userRepository.findByUserId(userId);
    if (user.getActive() != 0) {
      int balance = user.getBalance();
      if (balance > limit) {
        UserDto userDto = mapper.INSTANCE.userToDto(user);
        userDto.setBalance(limit);
        userDto.setCardLimit(limit);
        userRepository.save(userDto.toEntity());
        setBlockUserBalance(userDto);
        return true;
      } else if (balance == limit) {
        UserDto userDto = mapper.INSTANCE.userToDto(user);
        userDto.setCardLimit(limit);
        userRepository.save(userDto.toEntity());
        return true;
      } else {
        int oldLimit = user.getCardLimit();
        UserDto userDto = mapper.INSTANCE.userToDto(user);
        userDto.setBalance(balance + (limit - oldLimit));
        userDto.setCardLimit(limit);
        userRepository.save(userDto.toEntity());
        setBlockUserBalance(userDto);
        return true;
      }
    }
    return false;
  }

  @Transactional
  public int banUser(int userId) {
    User user = userRepository.findByUserId(userId);
    // if (user.getActive() != 2) {
    UserDto userDto = mapper.INSTANCE.userToDto(user);
    userDto.setActive(2);
    userRepository.save(userDto.toEntity());
    return 1;
    // }
    // return 0;
  }

  @Transactional
  public int deleteUser(int userId) {
    User user = userRepository.findByUserId(userId);
    // if (user.getActive() != 0) {
    UserDto userDto = mapper.INSTANCE.userToDto(user);
    userDto.setActive(0);
    userRepository.save(userDto.toEntity());
    return 1;
    // }
    // return 0;
  }

  @Transactional
  public int activateUser(int userId) {
    User user = userRepository.findByUserId(userId);
    // if (user.getActive() != 1) {
    UserDto userDto = mapper.INSTANCE.userToDto(user);
    userDto.setActive(1);
    userRepository.save(userDto.toEntity());
    return 1;
    // }
    // return 0;
  }

  public boolean login(UserDto user) {
    User userInfo = userRepository.findByEmail(user.getEmail());
    UserDto userDto = mapper.INSTANCE.userToDto(userInfo);
    String encodedPassword = userRepository.findPwd(user.getEmail());
    if (passwordEncoder.matches(user.getPassword(), encodedPassword)
        && user.getEmail().equals(userInfo.getEmail())) {
      user.setPassword(encodedPassword);
      boolean result = userRepository.existsByEmailAndPassword(user.getEmail(), user.getPassword());
      if (result) {
        userDto.setAccessTime(user.getAccessTime());
        userRepository.save(userDto.toEntity());
      }
      return result;
    } else {
      return false;
    }
  }

  public boolean loginAdmin(AdminDto admin) {
    String encodedPassword = adminRepository.findPwd(admin.getEmail());
    Admin adminET = adminRepository.findByEmail(admin.getEmail());
    if (passwordEncoder.matches(admin.getPassword(), encodedPassword)
        && adminET.getEmail().equals(admin.getEmail())) {
      admin.setPassword(encodedPassword);
      boolean result =
          adminRepository.existsByEmailAndPassword(admin.getEmail(), admin.getPassword());
      return result;
    } else {
      return false;
    }
  }

  public int assignedTotal() {
    int total = 0;
    List<Integer> assigned = userRepository.findCardLimitByActive();
    for (int cnt : assigned) {
      total += cnt;
    }
    return total;
  }

  public Boolean pay(int userId, int bill) {
    User user = userRepository.findByUserId(userId);
    UserDto userDto = mapper.INSTANCE.userToDto(user);
    int afterBalance = userDto.getBalance() - bill;
    if (afterBalance >= 0) {
      userDto.setBalance(afterBalance);
      userRepository.save(userDto.toEntity());
      // user write 이후 read 불가능하기 때문에 transaction 생성 이후 user write
      return true;
    } else {
      return false;
    }
  }

  public boolean verifyBlockUser(UserDto user) {
    try {
      BlockUserDto blockUser = blockchainService.getUser(user.getEmail()).block();
      if (user.getEmail().equals(blockUser.getUserId())
          && user.getBalance() == blockUser.getBalance()) {
        user.setVerified(true);
      }

      return true;
    } catch (Exception e) {
      return false;
    }
  }

  public void setBlockUserBalance(UserDto user) {
    BlockUserDto blockUser =
        BlockUserDto.builder()
        .userId(user.getEmail())
        .balance(user.getBalance())
        .build();
    blockchainService.setBalance(blockUser).subscribe();
  }

  public void createBlockUser(UserDto user) {
    BlockUserDto blockUser = BlockUserDto.builder()
        .userId(user.getEmail())
        .type("User")
        .balance(user.getBalance())
        .build();

    Mono<BlockUserDto> u = blockchainService.createUser(blockUser);
    u.subscribe(response -> {
      // 생성된 경우 상태 변경
      user.setTestCode(1);
      userRepository.save(user.toEntity());
    });
  }

  public boolean resetBalance(int userId) {
    User user = userRepository.findByUserId(userId);
    int cardLimit = user.getCardLimit();
    if (user.getActive() != 0) {
      UserDto userDto = mapper.INSTANCE.userToDto(user);
      userDto.setBalance(cardLimit);
      userRepository.save(userDto.toEntity());
      setBlockUserBalance(userDto);
      return true;
    }
    return false;
  }

}
