package com.web.shinhan.model.service;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.web.shinhan.entity.Payment;
import com.web.shinhan.model.PaymentDto;
import com.web.shinhan.model.mapper.PaymentMapper;
import com.web.shinhan.repository.PaymentRepository;

@Service
public class PaymentService {

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	private PaymentRepository paymentRepository;

	private final PaymentMapper mapper = Mappers.getMapper(PaymentMapper.class);

	@Transactional
	public Page<PaymentDto> findUserPayment(int userId, Pageable pageable) {
		Page<Payment> payments = paymentRepository.findAllByUserId(userId, pageable);
		return payments.map(PaymentDto::of);
	}

	@Transactional
	public Page<PaymentDto> findAll(Pageable pageable) {
		Page<Payment> payments = paymentRepository.findAll(pageable);
		return payments.map(PaymentDto::of);
	}

	@Transactional
	public boolean confirmPayment(int userId) {
		Payment payment = paymentRepository.findByUserId(userId);
		if (payment.getStatus() == 1) {
			PaymentDto paymentDto = mapper.INSTANCE.paymentToDto(payment);
			paymentDto.setStatus(2);
			paymentRepository.save(paymentDto.toEntity());
			return true;
		}
		return false;
	}

	@Transactional
	public Page<PaymentDto> findStorePayment(int storeId, Pageable pageable) {
		Page<Payment> payments = paymentRepository.findAllByStoreId(storeId, pageable);
		return payments.map(PaymentDto::of);
	}

	@Transactional
	public Page<PaymentDto> findDepartmentPayment(String department, Pageable pageable) {
		Page<Payment> payments = paymentRepository.findAllByDepartment(department, pageable);
		return payments.map(PaymentDto::of);
	}

//	public int calcTotalExpense() {
//		return paymentRepository.calcTotalExpense();
//	}

//	public int notConfirmedExpense() {
//		int cnt = 0;
//		while (true) {
//			if (true) {
//				break;
//			}
//			int temp = paymentRepository.findAllByStatus();
//		}
//		return cnt;
//	}

	public List<PaymentDto> expenseByMonth(int now, int year) throws ParseException {
		List<PaymentDto> monthly = null;
//		String date1 = year + "-";
//		String date2 = year + "-";

		System.out.println("before If" + monthly + " " + now);

		if (now == 1 || now == 3 || now == 5 || now == 7 || now == 8 || now == 10 || now == 12) {
//			System.out.println(now + " ");
			LocalDateTime startDate = LocalDateTime.of(year, now, 01, 00, 00);
			LocalDateTime endDate = LocalDateTime.of(year, now, 31, 23, 59);
			System.out.println(startDate + " date " + endDate);
			List<Payment> payments = paymentRepository.findAllByMonth(startDate, endDate);
			System.out.println(payments + " now" + now);
			for (Payment payment : payments) {
				PaymentDto paymentDto = mapper.INSTANCE.paymentToDto(payment);
				monthly.add(paymentDto);
			}
		} else if (now == 4 || now == 6 || now == 9 || now == 11) {
			LocalDateTime startDate = LocalDateTime.of(year, now, 01, 00, 00);
			LocalDateTime endDate = LocalDateTime.of(year, now, 30, 23, 59);
			List<Payment> payments = paymentRepository.findAllByMonth(startDate, endDate);
			System.out.println(payments + " now" + now);
			for (Payment payment : payments) {
				PaymentDto paymentDto = mapper.INSTANCE.paymentToDto(payment);
				monthly.add(paymentDto);
			}
		} else {
			LocalDateTime startDate = LocalDateTime.of(year, now, 01, 00, 00);
			LocalDateTime endDate = LocalDateTime.of(year, now, 28, 23, 59);
			List<Payment> payments = paymentRepository.findAllByMonth(startDate, endDate);
			System.out.println(payments + " now" + now);
			for (Payment payment : payments) {
				PaymentDto paymentDto = mapper.INSTANCE.paymentToDto(payment);
				monthly.add(paymentDto);
			}
		}
		return monthly;
	}

	public List<PaymentDto> expenseByCategory() {
		List<Payment> payments = paymentRepository.findAll();
		List<PaymentDto> dto = null;
		for (Payment payment : payments) {
			PaymentDto paymentDto = mapper.INSTANCE.paymentToDto(payment);
			dto.add(paymentDto);
		}
		return dto;
	}

}