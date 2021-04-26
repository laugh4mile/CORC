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
		System.out.println(userDto.toEntity());
		userRepository.save(userDto.toEntity());
//		userRepository.regist(userDto);
	}

	public boolean selectUserEmail(UserDto userDto) {
		boolean result = userRepository.existsByEmail(userDto.getEmail());

		return result;
	}

	public User selectUserAccount(UserDto userDto) {
		User userInfo = userRepository.findByEmail(userDto.getEmail());
		return userInfo;
	}

	public UserDto login(UserDto userDto) {
		String encodedPassword = userRepository.findPwd(userDto.getEmail());
		System.out.println("encp" + encodedPassword);
		if (passwordEncoder.matches(userDto.getPassword(), encodedPassword)) {
			System.out.println("in");
			System.out.println("before" + userDto);
			userDto.setPassword(encodedPassword);
			System.out.println("dto " + userDto);
			UserDto answer = userRepository.login(userDto.getEmail(), userDto.getPassword());
			System.out.println("ans" + answer);
			return answer;
		} else {
			return null;
		}
	}

}