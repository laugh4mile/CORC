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
@Entity(name = "paymentitem")
public class Paymentitem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int paymentItemId;

	private int productId;
	private int paymentId;
	private int amount;

	@Builder
	public Paymentitem(int paymentItemId, int productId, int paymentId, int amount) {
		this.paymentItemId = paymentItemId;
		this.productId = productId;
		this.paymentId = paymentId;
		this.amount = amount;
	}

}