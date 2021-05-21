package com.web.shinhan.model.mapper;

import com.web.shinhan.entity.Gugun;
import com.web.shinhan.model.GugunDto;
import com.web.shinhan.model.GugunDto.GugunDtoBuilder;

public class GugunMapperImpl implements GugunMapper {

  @Override
  public GugunDto guguncodeToDto(Gugun guguncode) {
    if (guguncode == null) {
      return null;
    }

    GugunDtoBuilder guguncodeDto = GugunDto.builder();

    guguncodeDto.gugunCode(guguncode.getGugunCode());
    guguncodeDto.gugunName(guguncode.getGugunName());

    return guguncodeDto.build();
  }

}
