package com.web.shinhan.model;

import java.time.LocalDateTime;

import com.web.shinhan.entity.Product;
import com.web.shinhan.entity.User;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data
@NoArgsConstructor
public class ProductDto {
	private int productId;
	private int storeId;
	private String productName;
	private int price;

	@Builder
	public ProductDto(int productId, int storeId, String productName, int price) {
		this.productId = productId;
		this.storeId = storeId;
		this.productName = productName;
		this.price = price;
	}
	
	public Product toEntity() {
		return Product.builder()
				.productId(productId)
				.storeId(storeId)
				.productName(productName)
				.price(price)
				.build();
	}

	public static ProductDto of(Product product) {
		return ProductDto.builder()
				.productId(product.getProductId())
				.storeId(product.getStoreId())
				.productName(product.getProductName())
				.price(product.getPrice())
				.build();
	}

	

}
