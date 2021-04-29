package com.web.shinhan.entity;

import javax.persistence.*;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity(name = "product")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int productId;

	private int storeId;
	private String productName;
	private int price;

	@Builder
	public Product(int productId, int storeId, String productName, int price) {
		this.productId = productId;
		this.storeId = storeId;
		this.productName = productName;
		this.price = price;
	}

}