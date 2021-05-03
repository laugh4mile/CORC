package com.web.shinhan.entity;

import java.time.LocalDateTime;

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
@Entity(name = "store")
public class Store {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int storeId;

	private String crNum;
	private int categoryCode;
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

	@Builder
	public Store(int storeId, String crNum, int categoryCode, String email, String password, String storeName,
			String contact, String bankName, int account, String sidoCode, String gugunCode, LocalDateTime requestDate,
			int accepted) {
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
	}

	@Override
	public String toString() {
		return "Store [storeId=" + storeId + ", crNum=" + crNum + ", categoryCode=" + categoryCode + ", email=" + email
				+ ", password=" + password + ", storeName=" + storeName + ", contact=" + contact + ", bankName="
				+ bankName + ", account=" + account + ", sidoCode=" + sidoCode + ", gugunCode=" + gugunCode
				+ ", requestDate=" + requestDate + ", accepted=" + accepted + "]";
	}

}