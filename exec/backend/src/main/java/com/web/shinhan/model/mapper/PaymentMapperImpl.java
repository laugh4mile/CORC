package com.web.shinhan.model.mapper;

import com.web.shinhan.entity.Payment;
import com.web.shinhan.model.PaymentDto;
import com.web.shinhan.model.PaymentDto.PaymentDtoBuilder;

public class PaymentMapperImpl implements PaymentMapper {

	@Override
	public PaymentDto paymentToDto(Payment payment) {
		if (payment == null) {
			return null;
		}

		PaymentDtoBuilder paymentDto = PaymentDto.builder();

		paymentDto.paymentId(payment.getPaymentId());
		paymentDto.userId(payment.getUserId());
		paymentDto.storeId(payment.getStoreId());
		paymentDto.total(payment.getTotal());
		paymentDto.status(payment.getStatus());
		paymentDto.date(payment.getDate());

		return paymentDto.build();
	}

}
