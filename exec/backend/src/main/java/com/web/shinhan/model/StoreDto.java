package com.web.shinhan.model;

import java.time.LocalDateTime;

import com.web.shinhan.entity.Category;
import com.web.shinhan.entity.Gugun;
import com.web.shinhan.entity.Sido;
import com.web.shinhan.entity.Store;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data
@NoArgsConstructor
public class StoreDto {

  private int storeId;
  private String crNum;
  private String categoryCode;
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

  private Category category;
  private Sido sido;
  private Gugun gugun;

  private int testCode;

  private boolean isVerified;

  @Builder
  public StoreDto(int storeId, String crNum, String categoryCode, String email, String password,
      String storeName,
      String contact, String bankName, int account, String sidoCode, String gugunCode,
      LocalDateTime requestDate,
      int accepted, Integer total, Category category, Sido sido, Gugun gugun, int testCode) {
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
    this.testCode = testCode;
  }

  public Store toEntity() {
    return Store.builder()
        .storeId(storeId)
        .crNum(crNum)
        .categoryCode(categoryCode)
        .email(email)
        .password(password)
        .storeName(storeName)
        .contact(contact)
        .bankName(bankName)
        .account(account)
        .sidoCode(sidoCode)
        .gugunCode(gugunCode)
        .requestDate(requestDate)
        .accepted(accepted)
        .total(total)
        .category(category)
        .sido(sido)
        .gugun(gugun)
        .testCode(testCode)
        .build();
  }

  public static StoreDto of(Store store) {
    return StoreDto.builder()
        .storeId(store.getStoreId())
        .crNum(store.getCrNum())
        .categoryCode(store.getCategoryCode())
        .email(store.getEmail())
        .password(store.getPassword())
        .storeName(store.getStoreName())
        .contact(store.getContact())
        .bankName(store.getBankName())
        .account(store.getAccount())
        .sidoCode(store.getSidoCode())
        .gugunCode(store.getGugunCode())
        .requestDate(store.getRequestDate())
        .accepted(store.getAccepted())
        .total(store.getTotal())
        .category(store.getCategory())
        .sido(store.getSido())
        .gugun(store.getGugun())
        .testCode(store.getTestCode())
        .build();
  }

}
