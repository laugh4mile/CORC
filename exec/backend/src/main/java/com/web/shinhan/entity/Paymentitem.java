package com.web.shinhan.entity;

import javax.persistence.*;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity(name = "paymentItem")
public class Paymentitem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int paymentItemId;

	private int paymentId;
	private String productName;
	private int price;
	private int amount;

//	@OneToMany(mappedBy = "paymentitem")
////	@JoinTable(name = "paymentitem_product", // 조인테이블명
////			joinColumns = @JoinColumn(name = "productId") // 외래키
////			inverseJoinColumns = @JoinColumn(name = "productId") // 반대 엔티티의 외래키
////	)
//	private Set<Product> product = new HashSet<>();
//	= new ArrayList<>();

	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "paymentId", insertable = false, updatable = false)
	private Payment payment;

	@Builder
	public Paymentitem(int paymentItemId, int paymentId, String productName, int price, int amount) {
		this.paymentItemId = paymentItemId;
		this.paymentId = paymentId;
		this.productName = productName;
		this.price = price;
		this.amount = amount;
	}

}