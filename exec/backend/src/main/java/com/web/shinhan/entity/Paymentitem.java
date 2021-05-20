package com.web.shinhan.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

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

  private int paymentId;
  private String productName;
  private int price;
  private int amount;

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
