package com.web.shinhan.model;

import com.web.shinhan.entity.Admin;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data
@NoArgsConstructor
public class AdminDto {

  private int adminId;
  private String email;
  private String password;

  @Builder
  public AdminDto(int adminId, String email, String password) {
    this.adminId = adminId;
    this.email = email;
    this.password = password;
  }

  public Admin toEntity() {
    return Admin.builder()
        .adminId(adminId)
        .email(email)
        .password(password)
        .build();
  }

}
