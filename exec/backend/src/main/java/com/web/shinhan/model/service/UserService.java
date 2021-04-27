package com.web.shinhan.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.web.shinhan.entity.User;
import com.web.shinhan.model.UserDto;
import com.web.shinhan.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;

	// insert
	@Transactional
	public void insertUser(UserDto userDto) {
		String encodePassword = passwordEncoder.encode(userDto.getPassword());
		userDto.setPassword(encodePassword);
		userRepository.save(userDto.toEntity());
	}

	public boolean selectUserEmail(UserDto userDto) {
		boolean result = userRepository.existsByEmail(userDto.getEmail());

		return result;
	}

	public User selectUserAccount(UserDto userDto) {
		User userInfo = userRepository.findByEmail(userDto.getEmail());
		return userInfo;
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