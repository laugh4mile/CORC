package com.web.shinhan.model;

import com.web.shinhan.entity.Payment;
import com.web.shinhan.entity.Paymentitem;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data
@NoArgsConstructor
public class PaymentitemDto {
	private int paymentItemId;
	private int productId;
	private int paymentId;
	private int amount;

	@Builder
	public PaymentitemDto(int paymentItemId, int productId, int paymentId, int amount) {
		this.paymentItemId = paymentItemId;
		this.productId = productId;
		this.paymentId = paymentId;
		this.amount = amount;
	}

	public Paymentitem toEntity() {
		return Paymentitem.builder().paymentItemId(paymentItemId).productId(productId).paymentId(paymentId)
				.amount(amount).build();
	}

	public static PaymentitemDto of(Paymentitem paymentitem) {
		return PaymentitemDto.builder().paymentItemId(paymentitem.getPaymentItemId())
				.productId(paymentitem.getProductId()).paymentId(paymentitem.getPaymentId())
				.amount(paymentitem.getAmount()).build();
	}

}
