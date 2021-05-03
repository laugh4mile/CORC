package com.web.shinhan.model.service;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.web.shinhan.entity.Payment;
import com.web.shinhan.entity.Paymentitem;
import com.web.shinhan.entity.User;
import com.web.shinhan.model.PaymentDto;
import com.web.shinhan.model.PaymentitemDto;
import com.web.shinhan.model.UserDto;
import com.web.shinhan.model.mapper.PaymentitemMapper;
import com.web.shinhan.repository.PaymentRepository;
import com.web.shinhan.repository.PaymentitemRepository;

@Service
public class PaymentitemService {

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	private PaymentitemRepository paymentitemRepository;

	private final PaymentitemMapper mapper = Mappers.getMapper(PaymentitemMapper.class);

	@Transactional
	public Map<String, Object> findItems(int storeId, int paymentId) {
		Map<String, Object> resultMap = new HashMap<>();
		List<Paymentitem> paymentItem = paymentitemRepository.findByStoreIdandPaymentId(storeId, paymentId);
		resultMap.put("paymentItem", paymentItem);
		return resultMap;
	}

}