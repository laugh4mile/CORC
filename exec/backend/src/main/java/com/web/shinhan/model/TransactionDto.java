package com.web.shinhan.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class TransactionDto {

  private String txId;
  private String from;
  private String to;
  private String value;

  public TransactionDto(String txId, String from, String to, String value) {
    this.txId = txId;
    this.from = from;
    this.to = to;
    this.value = value;
  }

  @Builder
  public TransactionDto(String from, String to, String value) {
    this.from = from;
    this.to = to;
    this.value = value;
  }
}
