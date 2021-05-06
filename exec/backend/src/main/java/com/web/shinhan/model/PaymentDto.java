package com.web.shinhan.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.web.shinhan.entity.Payment;
import com.web.shinhan.entity.Paymentitem;
import com.web.shinhan.entity.Store;
import com.web.shinhan.entity.User;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data
@NoArgsConstructor
public class PaymentDto {
	private int paymentId;
	private int userId;
	private int storeId;
	private int total;
	private LocalDateTime date;
	private int status;

	private List<Paymentitem> paymentitem = new ArrayList<>();
	private User user;
	private Store store;

	@Builder
	public PaymentDto(int paymentId, int userId, int storeId, int total, LocalDateTime date, int status,
			List<Paymentitem> paymentitem, User user, Store store) {
		this.paymentId = paymentId;
		this.userId = userId;
		this.storeId = storeId;
		this.total = total;
		this.date = date;
		this.status = status;
		this.paymentitem = paymentitem;
		this.user = user;
		this.store = store;
	}

	public Payment toEntity() {
		return Payment.builder().paymentId(paymentId).userId(userId).storeId(storeId).total(total).date(date)
				.status(status).paymentitem(paymentitem).user(user).store(store).build();
	}

	public static PaymentDto of(Payment payment) {
		return PaymentDto.builder().paymentId(payment.getPaymentId()).userId(payment.getUserId())
				.storeId(payment.getStoreId()).total(payment.getTotal()).date(payment.getDate())
				.status(payment.getStatus()).paymentitem(payment.getPaymentitem()).user(payment.getUser())
				.store(payment.getStore()).build();
	}

}
