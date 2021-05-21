package com.web.shinhan.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity(name = "guguncode")
public class Gugun {

  @Id
  private String gugunCode;

  private String gugunName;

  @Builder
  public Gugun(String gugunCode, String gugunName) {
    this.gugunCode = gugunCode;
    this.gugunName = gugunName;
  }

}
