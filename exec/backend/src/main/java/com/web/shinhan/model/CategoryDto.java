package com.web.shinhan.model;

import com.web.shinhan.entity.Category;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data
@NoArgsConstructor
public class CategoryDto {

  private String categoryCode;
  private String categoryClassification;
  private String categoryName;

  @Builder
  public CategoryDto(String categoryCode, String categoryClassification, String categoryName) {
    this.categoryCode = categoryCode;
    this.categoryClassification = categoryClassification;
    this.categoryName = categoryName;
  }

  public Category toEntity() {
    return Category.builder()
        .categoryCode(categoryCode)
        .categoryClassification(categoryClassification)
        .categoryName(categoryName)
        .build();
  }

  public static CategoryDto of(Category category) {
    return CategoryDto.builder()
        .categoryCode(category.getCategoryCode())
        .categoryClassification(category.getCategoryClassification())
        .categoryName(category.getCategoryName())
        .build();
  }

}
