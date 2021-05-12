package com.web.shinhan.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.web.shinhan.entity.User;
import com.web.shinhan.model.UserDto;

@Mapper
public interface UserMapper {

  UserMapper INSTANCE = Mappers.getMapper(UserMapper.class); // 2

  @Mapping(target = "")
  UserDto userToDto(User user);
}
