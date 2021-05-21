package com.web.shinhan.model.mapper;

import com.web.shinhan.entity.User;
import com.web.shinhan.model.UserDto;
import com.web.shinhan.model.UserDto.UserDtoBuilder;

public class UserMapperImpl implements UserMapper {

  @Override
  public UserDto userToDto(User user) {
    if (user == null) {
      return null;
    }

    UserDtoBuilder userDto = UserDto.builder();

    userDto.userId(user.getUserId());
    userDto.employeeNum(user.getEmployeeNum());
    userDto.email(user.getEmail());
    userDto.userName(user.getUserName());
    userDto.password(user.getPassword());
    userDto.department(user.getDepartment());
    userDto.position(user.getPosition());
    userDto.contact(user.getContact());
    userDto.days(user.getDays());
    userDto.sidoCode(user.getSidoCode());
    userDto.gugunCode(user.getGugunCode());
    userDto.balance(user.getBalance());
    userDto.cardLimit(user.getCardLimit());
    userDto.active(user.getActive());
    userDto.accessTime(user.getAccessTime());
    userDto.sido(user.getSido());
    userDto.gugun(user.getGugun());

    return userDto.build();
  }

}
