package com.web.shinhan.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.web.shinhan.entity.Paymentitem;
import com.web.shinhan.model.PaymentitemDto;

@Mapper
public interface PaymentitemMapper {

  PaymentitemMapper INSTANCE = Mappers.getMapper(PaymentitemMapper.class); // 2

  @Mapping(target = "")
  PaymentitemDto paymentitemToDto(Paymentitem paymentitem);
}
