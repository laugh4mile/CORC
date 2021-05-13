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
    paymentitemDto.productName(paymentitem.getProductName());
    paymentitemDto.paymentId(paymentitem.getPaymentId());
    paymentitemDto.price(paymentitem.getPrice());
    paymentitemDto.amount(paymentitem.getAmount());

    return paymentitemDto.build();
  }

}
