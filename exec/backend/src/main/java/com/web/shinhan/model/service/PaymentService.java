package com.web.shinhan.model.service;

import java.text.ParseException;
import java.time.LocalDateTime;
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
import com.web.shinhan.model.PaymentitemDto;
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
	public boolean confirmPayment(int paymentId) {
		Payment payment = paymentRepository.findByPaymentId(paymentId);
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

	public int findStoreTotal() {
		int total = 0;
		List<Integer> used = paymentRepository.calcTotalExpense();
		for (int nc : used) {
			total += nc;
		}
		return total;
	}

	@Transactional
	public Page<PaymentDto> findDepartmentPayment(String department, Pageable pageable) {
		Page<Payment> payments = paymentRepository.findAllByDepartment(department, pageable);
		return payments.map(PaymentDto::of);
	}

	public int calcTotalExpense() {
		int total = 0;
		List<Integer> used = paymentRepository.calcTotalExpense();
		for (int nc : used) {
			total += nc;
		}
		return total;
	}

	public int notConfirmed() {
		int total = 0;
		List<Integer> notConfirmed = paymentRepository.findTotalByStatus();
		for (int nc : notConfirmed) {
			total += nc;
		}
		return total;
	}

	public int expenseByMonth(int now, int year) {
		int monthly = 0;

		if (now == 1 || now == 3 || now == 5 || now == 7 || now == 8 || now == 10 || now == 12) {
			LocalDateTime startDate = LocalDateTime.of(year, now, 01, 00, 00);
			LocalDateTime endDate = LocalDateTime.of(year, now, 31, 23, 59);
			List<Integer> payments = paymentRepository.findAllByMonth(startDate, endDate);
			for (int payment : payments) {
				monthly += payment;
			}
		} else if (now == 4 || now == 6 || now == 9 || now == 11) {
			LocalDateTime startDate = LocalDateTime.of(year, now, 01, 00, 00);
			LocalDateTime endDate = LocalDateTime.of(year, now, 30, 23, 59);
			List<Integer> payments = paymentRepository.findAllByMonth(startDate, endDate);
			for (int payment : payments) {
				monthly += payment;
			}
		} else {
			if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
				LocalDateTime startDate = LocalDateTime.of(year, now, 01, 00, 00);
				LocalDateTime endDate = LocalDateTime.of(year, now, 29, 23, 59);
				List<Integer> payments = paymentRepository.findAllByMonth(startDate, endDate);
				for (int payment : payments) {
					monthly += payment;
				}
			} else {
				LocalDateTime startDate = LocalDateTime.of(year, now, 01, 00, 00);
				LocalDateTime endDate = LocalDateTime.of(year, now, 28, 23, 59);
				List<Integer> payments = paymentRepository.findAllByMonth(startDate, endDate);
				for (int payment : payments) {
					monthly += payment;
				}
			}
		}
		return monthly;
	}

	public List<PaymentDto> expenseByCategory() {
		List<Payment> payments = paymentRepository.findAllByStatus();
		List<PaymentDto> dto = null;
		for (Payment payment : payments) {
			PaymentDto paymentDto = mapper.INSTANCE.paymentToDto(payment);
			dto.add(paymentDto);
		}
		return dto;
	}

	public int findTotal(int storeId) {
		int total = 0;
		List<Integer> totalUsed = paymentRepository.findTotalByStoreId(storeId);
		for (int nc : totalUsed) {
			total += nc;
		}
		return total;
	}

	public int findNotConfirmed(int storeId) {
		int total = 0;
		List<Integer> notConfirmed = paymentRepository.findNotConfirmedByStoreId(storeId);
		for (int nc : notConfirmed) {
			total += nc;
		}
		return total;
	}

}