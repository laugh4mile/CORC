package com.web.shinhan.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
@Entity(name = "store")
public class Store {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int storeId;

	private String crNum;
	private String categoryCode;
	@Column(unique = true)
	private String email;
	private String password;
	private String storeName;
	private String contact;
	private String bankName;
	private int account;
	private String sidoCode;
	private String gugunCode;
	private LocalDateTime requestDate;
	private int accepted;
	private Integer total;

	@OneToOne
	@JoinColumn(name = "categoryCode", insertable = false, updatable = false)
	private Category category;

	@OneToOne
	@JoinColumn(name = "sidoCode", insertable = false, updatable = false)
	private Sido sido;

	@OneToOne
	@JoinColumn(name = "gugunCode", insertable = false, updatable = false)
	private Gugun gugun;

	@Builder
	public Store(int storeId, String crNum, String categoryCode, String email, String password, String storeName,
			String contact, String bankName, int account, String sidoCode, String gugunCode, LocalDateTime requestDate,
			int accepted, Integer total, Category category, Sido sido, Gugun gugun) {
		this.storeId = storeId;
		this.crNum = crNum;
		this.categoryCode = categoryCode;
		this.email = email;
		this.password = password;
		this.storeName = storeName;
		this.contact = contact;
		this.bankName = bankName;
		this.account = account;
		this.sidoCode = sidoCode;
		this.gugunCode = gugunCode;
		this.requestDate = requestDate;
		this.accepted = accepted;
		this.total = total;
		this.category = category;
		this.sido = sido;
		this.gugun = gugun;
	}

}