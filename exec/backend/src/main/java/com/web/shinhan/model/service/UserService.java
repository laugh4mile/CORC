package com.web.shinhan.model.service;

import java.util.List;
import java.util.Optional;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.web.shinhan.entity.User;
import com.web.shinhan.model.UserDto;
import com.web.shinhan.model.mapper.UserMapper;
import com.web.shinhan.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;

	private final UserMapper mapper = Mappers.getMapper(UserMapper.class);

	@Transactional
	public Page<UserDto> findAllUser(Pageable pageable) {
		Page<User> users = userRepository.findAll(pageable);
		return users.map(UserDto::of);
	}

	public UserDto findUserInfo(String email) {
		User userInfo = userRepository.findByEmail(email);
		UserDto userDto = mapper.INSTANCE.userToDto(userInfo);
		return userDto;
	}

	// insert
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

//	public boolean modifyUserInfo(UserDto userDto) {
////		boolean result = userRepository.existsByEmployee_num(userDto);
//		return true;
//	}

	@Transactional
	public int banUser(int userId) {
		User user = userRepository.findByUserId(userId);
		if (user.getActive() != 0) {
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

}