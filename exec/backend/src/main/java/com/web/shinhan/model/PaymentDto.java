package com.web.shinhan.model;

import java.time.LocalDateTime;

import com.web.shinhan.entity.Payment;
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

	@Builder
	public PaymentDto(int paymentId, int userId, int storeId, int total, LocalDateTime date, int status) {
		this.paymentId = paymentId;
		this.userId = userId;
		this.storeId = storeId;
		this.total = total;
		this.date = date;
		this.status = status;
	}

	public Payment toEntity() {
		return Payment.builder().paymentId(paymentId).userId(userId).storeId(storeId).total(total).date(date)
				.status(status).build();
	}

	public static PaymentDto of(Payment payment) {
		return PaymentDto.builder().paymentId(payment.getPaymentId()).userId(payment.getUserId())
				.storeId(payment.getStoreId()).total(payment.getTotal()).date(payment.getDate())
				.status(payment.getStatus()).build();
	}

}
