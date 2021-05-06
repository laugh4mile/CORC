package com.web.shinhan.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity(name = "payment")
public class Payment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int paymentId;

	private int userId;
	private int storeId;
	private int total;
	private int status;
	private LocalDateTime date;

	@JsonManagedReference
	@OneToMany(mappedBy = "payment", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Paymentitem> paymentitem = new ArrayList<>();

	@OneToOne
	@JoinColumn(name = "userId", insertable = false, updatable = false)
	private User user;

	@OneToOne
	@JoinColumn(name = "storeId", insertable = false, updatable = false)
	private Store store;

	@Builder
	public Payment(int paymentId, int userId, int storeId, int total, int status, LocalDateTime date,
			List<Paymentitem> paymentitem, User user, Store store) {
		this.paymentId = paymentId;
		this.userId = userId;
		this.storeId = storeId;
		this.total = total;
		this.status = status;
		this.date = date;
		this.paymentitem = paymentitem;
		this.user = user;
		this.store = store;
	}

//	@JsonManagedReference
//	@OneToMany(mappedBy = "payment", cascade = CascadeType.ALL, orphanRemoval = true)
//	private List<Store> store = new ArrayList<>();
//	(cascade = { CascadeType.ALL })
//	@JoinColumn(name = "paymentId", insertable = false, updatable = false)

//	@OneToMany(mappedBy = "payment", cascade = CascadeType.ALL, orphanRemoval = true)
////	(cascade = { CascadeType.ALL })
////	@JoinColumn(name = "paymentId", insertable = false, updatable = false)
//	private Store store;

}