package com.web.shinhan.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.web.shinhan.entity.Paymentitem;
import com.web.shinhan.entity.Sido;
import com.web.shinhan.model.SidoDto;

@Mapper
public interface SidoMapper {

  SidoMapper INSTANCE = Mappers.getMapper(SidoMapper.class); // 2

  @Mapping(target = "")
  SidoDto sidocodeToDto(Sido sidocode);
}
