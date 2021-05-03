package com.web.shinhan.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.web.shinhan.entity.Guguncode;
import com.web.shinhan.entity.Paymentitem;
import com.web.shinhan.entity.Sidocode;
import com.web.shinhan.model.GuguncodeDto;
import com.web.shinhan.model.SidocodeDto;

@Mapper
public interface GuguncodeMapper {
	GuguncodeMapper INSTANCE = Mappers.getMapper(GuguncodeMapper.class); // 2

	@Mapping(target = "")
	GuguncodeDto guguncodeToDto(Guguncode guguncode);
}
