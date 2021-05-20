package com.web.shinhan.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity(name = "sidocode")
public class Sido {

  @Id
  private String sidoCode;

  private String sidoName;

  @Builder
  public Sido(String sidoCode, String sidoName) {
    this.sidoCode = sidoCode;
    this.sidoName = sidoName;
  }

}
