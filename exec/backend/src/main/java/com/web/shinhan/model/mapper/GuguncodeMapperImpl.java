package com.web.shinhan.model.mapper;

import com.web.shinhan.entity.Guguncode;
import com.web.shinhan.model.GuguncodeDto;
import com.web.shinhan.model.GuguncodeDto.GuguncodeDtoBuilder;

public class GuguncodeMapperImpl implements GuguncodeMapper {

	@Override
	public GuguncodeDto guguncodeToDto(Guguncode guguncode) {
		if (guguncode == null) {
			return null;
		}

		GuguncodeDtoBuilder guguncodeDto = GuguncodeDto.builder();

		guguncodeDto.gugunCode(guguncode.getGugunCode());
		guguncodeDto.gugunName(guguncode.getGugunName());

		return guguncodeDto.build();
	}

}
