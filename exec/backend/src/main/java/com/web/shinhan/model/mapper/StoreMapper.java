package com.web.shinhan.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.web.shinhan.entity.Store;
import com.web.shinhan.model.StoreDto;

@Mapper
public interface StoreMapper {

  StoreMapper INSTANCE = Mappers.getMapper(StoreMapper.class); // 2

  @Mapping(target = "")
  StoreDto storeToDto(Store store);
}
