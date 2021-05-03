package com.web.shinhan.model.mapper;

import com.web.shinhan.entity.Paymentitem;
import com.web.shinhan.model.PaymentitemDto;
import com.web.shinhan.model.PaymentitemDto.PaymentitemDtoBuilder;

public class PaymentitemMapperImpl implements PaymentitemMapper {

	@Override
	public PaymentitemDto paymentitemToDto(Paymentitem paymentitem) {
		if (paymentitem == null) {
			return null;
		}

		PaymentitemDtoBuilder paymentitemDto = PaymentitemDto.builder();

		paymentitemDto.paymentItemId(paymentitem.getPaymentItemId());
		paymentitemDto.paymentId(paymentitem.getPaymentId());
		paymentitemDto.productId(paymentitem.getProductId());
		paymentitemDto.amount(paymentitem.getAmount());

		return paymentitemDto.build();
	}

}
