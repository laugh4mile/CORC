package com.web.shinhan.model.mapper;

import com.web.shinhan.entity.Sidocode;
import com.web.shinhan.model.SidocodeDto;
import com.web.shinhan.model.SidocodeDto.SidocodeDtoBuilder;

public class SidocodeMapperImpl implements SidocodeMapper {

	@Override
	public SidocodeDto sidocodeToDto(Sidocode sidocode) {
		if (sidocode == null) {
			return null;
		}

		SidocodeDtoBuilder sidocodeDto = SidocodeDto.builder();

		sidocodeDto.sidoCode(sidocode.getSidoCode());
		sidocodeDto.sidoName(sidocode.getSidoName());

		return sidocodeDto.build();
	}

}
