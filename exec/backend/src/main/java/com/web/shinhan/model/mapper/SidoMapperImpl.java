package com.web.shinhan.model.mapper;

import com.web.shinhan.entity.Sido;
import com.web.shinhan.model.SidoDto;
import com.web.shinhan.model.SidoDto.SidoDtoBuilder;

public class SidoMapperImpl implements SidoMapper {

  @Override
  public SidoDto sidocodeToDto(Sido sidocode) {
    if (sidocode == null) {
      return null;
    }

    SidoDtoBuilder sidocodeDto = SidoDto.builder();

    sidocodeDto.sidoCode(sidocode.getSidoCode());
    sidocodeDto.sidoName(sidocode.getSidoName());

    return sidocodeDto.build();
  }

}
