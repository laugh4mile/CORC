package com.web.shinhan.model;

import java.time.LocalDateTime;

import com.web.shinhan.entity.Category;
import com.web.shinhan.entity.User;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data
@NoArgsConstructor
public class CategoryDto {
	private int categoryCode;
	private String categoryName;

	@Builder
	public CategoryDto(int categoryCode, String categoryName) {
		super();
		this.categoryCode = categoryCode;
		this.categoryName = categoryName;
	}
	
	public Category toEntity() {
		return Category.builder()
				.categoryCode(categoryCode)
				.categoryName(categoryName)
				.build();
	}

	public static CategoryDto of(Category category) {
		return CategoryDto.builder()
				.categoryCode(category.getCategoryCode())
				.categoryName(category.getCategoryName())
				.build();
	}

	

	

}
