package com.web.shinhan.model.service;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.ArrayList;
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

import com.web.shinhan.entity.Gugun;
import com.web.shinhan.entity.Payment;
import com.web.shinhan.entity.Paymentitem;
import com.web.shinhan.entity.Sido;
import com.web.shinhan.entity.User;
import com.web.shinhan.model.GugunDto;
import com.web.shinhan.model.PaymentDto;
import com.web.shinhan.model.PaymentitemDto;
import com.web.shinhan.model.SidoDto;
import com.web.shinhan.model.StoreDto;
import com.web.shinhan.model.UserDto;
import com.web.shinhan.model.mapper.GugunMapper;
import com.web.shinhan.model.mapper.PaymentitemMapper;
import com.web.shinhan.model.mapper.SidoMapper;
import com.web.shinhan.repository.GugunRepository;
import com.web.shinhan.repository.PaymentRepository;
import com.web.shinhan.repository.PaymentitemRepository;
import com.web.shinhan.repository.SidoRepository;

@Service
public class AreaService {

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	private SidoRepository sidocodeRepository;

	@Autowired
	private GugunRepository guguncodeRepository;

	private final SidoMapper sidoMapper = Mappers.getMapper(SidoMapper.class);

	private final GugunMapper gugunMapper = Mappers.getMapper(GugunMapper.class);

	@Transactional
	public List<SidoDto> findSidoAll() {
		List<Sido> sidoEN = sidocodeRepository.findAll();
		List<SidoDto> sidoDto = new ArrayList<>();
		for (Sido sido : sidoEN) {
			sidoDto.add(sidoMapper.INSTANCE.sidocodeToDto(sido));
		}
		return sidoDto;
	}

	@Transactional
	public List<GugunDto> findGugun(String sidoCode) {
		sidoCode = sidoCode.substring(0, 2);
		System.out.println(sidoCode);
		List<Gugun> gugunEN = guguncodeRepository.findAllBySidocode(sidoCode);
		System.out.println(gugunEN.toString());
		List<GugunDto> gugunDto = new ArrayList<>();
		for (Gugun gugun : gugunEN) {
			gugunDto.add(gugunMapper.INSTANCE.guguncodeToDto(gugun));
		}
		return gugunDto;
	}

//	@Transactional
//	public Map<String, Object> findItems(int storeId, int paymentId) {
//		Map<String, Object> resultMap = new HashMap<>();
//		List<Paymentitem> paymentItem = paymentitemRepository.findByStoreIdandPaymentId(storeId, paymentId);
//		resultMap.put("paymentItem", paymentItem);
//		return resultMap;
//	}

}