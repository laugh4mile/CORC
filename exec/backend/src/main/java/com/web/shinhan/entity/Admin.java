package com.web.shinhan.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity(name = "admin")
public class Admin {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int adminId;

  private String email;
  private String password;

  @Builder
  public Admin(int adminId, String email, String password) {
    this.adminId = adminId;
    this.email = email;
    this.password = password;
  }

}
