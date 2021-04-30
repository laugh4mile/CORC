package com.web.shinhan.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.web.shinhan.entity.Area;
import com.web.shinhan.entity.Paymentitem;
import com.web.shinhan.model.AreaDto;
import com.web.shinhan.model.PaymentitemDto;

@Mapper
public interface AreaMapper {
	AreaMapper INSTANCE = Mappers.getMapper(AreaMapper.class); // 2

	@Mapping(target = "")
	AreaDto areaToDto(Area area);
}
