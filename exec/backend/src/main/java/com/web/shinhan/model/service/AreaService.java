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

import com.web.shinhan.entity.Guguncode;
import com.web.shinhan.entity.Payment;
import com.web.shinhan.entity.Paymentitem;
import com.web.shinhan.entity.Sidocode;
import com.web.shinhan.entity.User;
import com.web.shinhan.model.GuguncodeDto;
import com.web.shinhan.model.PaymentDto;
import com.web.shinhan.model.PaymentitemDto;
import com.web.shinhan.model.SidocodeDto;
import com.web.shinhan.model.StoreDto;
import com.web.shinhan.model.UserDto;
import com.web.shinhan.model.mapper.GuguncodeMapper;
import com.web.shinhan.model.mapper.PaymentitemMapper;
import com.web.shinhan.model.mapper.SidocodeMapper;
import com.web.shinhan.repository.GuguncodeRepository;
import com.web.shinhan.repository.PaymentRepository;
import com.web.shinhan.repository.PaymentitemRepository;
import com.web.shinhan.repository.SidocodeRepository;

@Service
public class AreaService {

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	private SidocodeRepository sidocodeRepository;

	@Autowired
	private GuguncodeRepository guguncodeRepository;

	private final SidocodeMapper sidoMapper = Mappers.getMapper(SidocodeMapper.class);

	private final GuguncodeMapper gugunMapper = Mappers.getMapper(GuguncodeMapper.class);

	@Transactional
	public List<SidocodeDto> findSidoAll() {
		List<Sidocode> sidoEN = sidocodeRepository.findAll();
		List<SidocodeDto> sidoDto = new ArrayList<>();
		for (Sidocode sido : sidoEN) {
			sidoDto.add(sidoMapper.INSTANCE.sidocodeToDto(sido));
		}
		return sidoDto;
	}

	@Transactional
	public List<GuguncodeDto> findGugun(String sidoCode) {
		sidoCode = sidoCode.substring(0, 2);
		System.out.println(sidoCode);
		List<Guguncode> gugunEN = guguncodeRepository.findAllBySidocode(sidoCode);
		System.out.println(gugunEN.toString());
		List<GuguncodeDto> gugunDto = new ArrayList<>();
		for (Guguncode gugun : gugunEN) {
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