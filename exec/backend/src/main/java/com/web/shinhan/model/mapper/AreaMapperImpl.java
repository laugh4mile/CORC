package com.web.shinhan.model.mapper;

import com.web.shinhan.entity.Area;
import com.web.shinhan.model.AreaDto;
import com.web.shinhan.model.AreaDto.AreaDtoBuilder;

public class AreaMapperImpl implements AreaMapper {

	@Override
	public AreaDto areaToDto(Area area) {
		if (area == null) {
			return null;
		}

		AreaDtoBuilder areaDto = AreaDto.builder();

		areaDto.areaId(area.getAreaId());
		areaDto.userId(area.getUserId());
		areaDto.storeId(area.getStoreId());
		areaDto.sidoCode(area.getSidoCode());
		areaDto.gugunCode(area.getGugunCode());

		return areaDto.build();
	}

}
