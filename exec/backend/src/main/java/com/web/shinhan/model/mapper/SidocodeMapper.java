package com.web.shinhan.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.web.shinhan.entity.Paymentitem;
import com.web.shinhan.entity.Sidocode;
import com.web.shinhan.model.SidocodeDto;

@Mapper
public interface SidocodeMapper {
	SidocodeMapper INSTANCE = Mappers.getMapper(SidocodeMapper.class); // 2

	@Mapping(target = "")
	SidocodeDto sidocodeToDto(Sidocode sidocode);
}
