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

  public static class Status {
    public static final int DENIEND = 0;
    public static final int CREATED = 1;
    public static final int ALLOWED = 2;
  }

  private int paymentId;
  private int userId;
  private int storeId;
  private int total;
  private LocalDateTime date;
  private int status;

  private List<Paymentitem> paymentitem = new ArrayList<>();
  private User user;
  private Store store;

  private String transactionId;
  private int testCode;
  private boolean isVerified;

  @Builder
  public PaymentDto(int paymentId, int userId, int storeId, int total, LocalDateTime date,
      int status,
      List<Paymentitem> paymentitem, User user, Store store, String transactionId, int testCode) {
    this.paymentId = paymentId;
    this.userId = userId;
    this.storeId = storeId;
    this.total = total;
    this.date = date;
    this.status = status;
    this.paymentitem = paymentitem;
    this.user = user;
    this.store = store;
    this.transactionId = transactionId;
    this.testCode = testCode;
  }

  public Payment toEntity() {
    return Payment.builder()
        .paymentId(paymentId)
        .userId(userId)
        .storeId(storeId)
        .total(total)
        .date(date)
        .status(status)
        .paymentitem(paymentitem)
        .user(user)
        .store(store)
        .transactionId(transactionId)
        .testCode(testCode)
        .build();
  }

  public static PaymentDto of(Payment payment) {
    return PaymentDto.builder()
        .paymentId(payment.getPaymentId())
        .userId(payment.getUserId())
        .storeId(payment.getStoreId())
        .total(payment.getTotal()).date(payment.getDate())
        .status(payment.getStatus())
        .paymentitem(payment.getPaymentitem())
        .user(payment.getUser())
        .store(payment.getStore())
        .transactionId(payment.getTransactionId())
        .testCode(payment.getTestCode())
        .build();
  }

}
