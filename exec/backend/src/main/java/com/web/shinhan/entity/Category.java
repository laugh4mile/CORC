package com.web.shinhan.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity(name = "category")
public class Category {

  @Id
  private String categoryCode;

  private String categoryClassification;
  private String categoryName;

  @Builder
  public Category(String categoryCode, String categoryClassification, String categoryName) {
    this.categoryCode = categoryCode;
    this.categoryClassification = categoryClassification;
    this.categoryName = categoryName;
  }

}
