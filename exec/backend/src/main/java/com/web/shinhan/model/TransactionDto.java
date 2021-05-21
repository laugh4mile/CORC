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
  private Integer value;

  @Builder
  public TransactionDto(String txId, String from, String to, Integer value) {
    this.txId = txId;
    this.from = from;
    this.to = to;
    this.value = value;
  }
}
