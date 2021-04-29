package com.web.shinhan.model.service;

import java.util.List;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.web.shinhan.entity.User;
import com.web.shinhan.model.AdminDto;
import com.web.shinhan.model.UserDto;
import com.web.shinhan.model.mapper.UserMapper;
import com.web.shinhan.repository.AdminRepository;
import com.web.shinhan.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AdminRepository adminRepository;

	private final UserMapper mapper = Mappers.getMapper(UserMapper.class);

	@Transactional
	public Page<UserDto> findAllUser(Pageable pageable) {
		Page<User> users = userRepository.findAll(pageable);
		return users.map(UserDto::of);
	}

	public UserDto findUserInfo(int userId) {
		User userInfo = userRepository.findByUserId(userId);
		UserDto userDto = mapper.INSTANCE.userToDto(userInfo);
		return userDto;
	}

	@Transactional
	public void insertUser(UserDto userDto) {
		String encodePassword = passwordEncoder.encode(userDto.getPassword());
		userDto.setPassword(encodePassword);
		userRepository.save(userDto.toEntity());
	}

	public boolean emailCheck(String email) {
		boolean result = userRepository.existsByEmail(email);
		return result;
	}

	public boolean employeenumCheck(int employee_num) {
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
		userDto.setBalance(newDto.getBalance());
		userDto.setCardLimit(newDto.getCardLimit());
		userDto.setAccessTime(newDto.getAccessTime());
		userDto.setActive(newDto.getActive());
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
			UserDto userDto = mapper.INSTANCE.userToDto(user);
			userDto.setCardLimit(limit);
			userRepository.save(userDto.toEntity());
			return true;
		}
		return false;
	}

	@Transactional
	public int banUser(int userId) {
		User user = userRepository.findByUserId(userId);
		if (user.getActive() != 2) {
			UserDto userDto = mapper.INSTANCE.userToDto(user);
			userDto.setActive(2);
			userRepository.save(userDto.toEntity());
			return 1;
		}
		return 0;
	}

	@Transactional
	public int deleteUser(int userId) {
		User user = userRepository.findByUserId(userId);
		if (user.getActive() != 0) {
			UserDto userDto = mapper.INSTANCE.userToDto(user);
			userDto.setActive(0);
			userRepository.save(userDto.toEntity());
			return 1;
		}
		return 0;
	}

	@Transactional
	public int activateUser(int userId) {
		User user = userRepository.findByUserId(userId);
		if (user.getActive() != 1) {
			UserDto userDto = mapper.INSTANCE.userToDto(user);
			userDto.setActive(1);
			userRepository.save(userDto.toEntity());
			return 1;
		}
		return 0;
	}

	public boolean login(UserDto userDto) {
		String encodedPassword = userRepository.findPwd(userDto.getEmail());
		if (passwordEncoder.matches(userDto.getPassword(), encodedPassword)) {
			userDto.setPassword(encodedPassword);
			boolean result = userRepository.existsByEmailAndPassword(userDto.getEmail(), userDto.getPassword());
			return result;
		} else {
			return false;
		}
	}

	public boolean loginAdmin(AdminDto admin) {
		String encodedPassword = adminRepository.findPwd(admin.getEmail());
		if (passwordEncoder.matches(admin.getPassword(), encodedPassword)) {
			admin.setPassword(encodedPassword);
			boolean result = adminRepository.existsByEmailAndPassword(admin.getEmail(), admin.getPassword());
			return result;
		} else {
			return false;
		}
	}

}