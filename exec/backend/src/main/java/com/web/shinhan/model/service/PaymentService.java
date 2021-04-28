package com.web.shinhan.model.service;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.web.shinhan.entity.Payment;
import com.web.shinhan.entity.User;
import com.web.shinhan.model.PaymentDto;
import com.web.shinhan.model.UserDto;
import com.web.shinhan.model.mapper.PaymentMapper;
import com.web.shinhan.model.mapper.UserMapper;
import com.web.shinhan.repository.PaymentRepository;
import com.web.shinhan.repository.UserRepository;

@Service
public class PaymentService {

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	private PaymentRepository paymentRepository;

	private final PaymentMapper mapper = Mappers.getMapper(PaymentMapper.class);

	@Transactional
	public Page<PaymentDto> findAllPayment(int userId, Pageable pageable) {
		Page<Payment> payments = paymentRepository.findAll(userId, pageable);
		return payments.map(PaymentDto::of);
	}

//	public UserDto getUserPayment(String email) {
//		User userInfo = paymentRepository.findByEmail(email);
//		UserDto userDto = mapper.INSTANCE.userToDto(userInfo);
//		return userDto;
//	}

	// insert
//	@Transactional
//	public void insertUser(UserDto userDto) {
//		String encodePassword = passwordEncoder.encode(userDto.getPassword());
//		userDto.setPassword(encodePassword);
//		paymentRepository.save(userDto.toEntity());
//	}

//	public boolean updateUserInfo(UserDto userDto) {
//		boolean result = userRepository.existsByEmployee_num(employee_num);
//		return result;
//	}

}