package com.web.shinhan.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

//	@OneToMany(mappedBy = "paymentitem")
////	@JoinTable(name = "paymentitem_product", // 조인테이블명
////			joinColumns = @JoinColumn(name = "productId") // 외래키
////			inverseJoinColumns = @JoinColumn(name = "productId") // 반대 엔티티의 외래키
////	)
	@OneToOne(cascade = { CascadeType.ALL })
	@JoinColumn(name = "productId", insertable = false, updatable = false)
	private Product product;
//	private Set<Product> product = new HashSet<>();
//	= new ArrayList<>();

	@Builder
	public Paymentitem(int paymentItemId, int productId, int paymentId, int amount) {
		this.paymentItemId = paymentItemId;
		this.productId = productId;
		this.paymentId = paymentId;
		this.amount = amount;
	}

	@Override
	public String toString() {
		return "Paymentitem [paymentItemId=" + paymentItemId + ", productId=" + productId + ", paymentId=" + paymentId
				+ ", amount=" + amount + ", product=" + product + "]";
	}

}