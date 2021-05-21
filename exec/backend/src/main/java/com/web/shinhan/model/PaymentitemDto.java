package com.web.shinhan.model;

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
  private int paymentId;
  private String productName;
  private int price;
  private int amount;

  @Builder
  public PaymentitemDto(int paymentItemId, int paymentId, String productName, int price,
      int amount) {
    this.paymentItemId = paymentItemId;
    this.paymentId = paymentId;
    this.productName = productName;
    this.price = price;
    this.amount = amount;
  }

  public Paymentitem toEntity() {
    return Paymentitem.builder()
        .paymentItemId(paymentItemId)
        .paymentId(paymentId)
        .productName(productName)
        .price(price)
        .amount(amount)
        .build();
  }

  public static PaymentitemDto of(Paymentitem paymentitem) {
    return PaymentitemDto.builder()
        .paymentItemId(paymentitem.getPaymentItemId())
        .productName(paymentitem.getProductName())
        .paymentId(paymentitem.getPaymentId())
        .price(paymentitem.getPrice())
        .amount(paymentitem.getAmount())
        .build();
  }

}
