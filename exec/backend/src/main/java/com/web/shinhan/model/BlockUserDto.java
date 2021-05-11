package com.web.shinhan.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class BlockUserDto {

  private String userId;
  private String type;
  private Integer balance;

  @Builder
  public BlockUserDto(String userId, String type, Integer balance) {
    this.userId = userId;
    this.type = type;
    this.balance = balance;
  }
}
