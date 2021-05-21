package com.web.shinhan.model;

import com.web.shinhan.entity.Sido;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data
@NoArgsConstructor
public class SidoDto {

  private String sidoCode;
  private String sidoName;

  @Builder
  public SidoDto(String sidoCode, String sidoName) {
    this.sidoCode = sidoCode;
    this.sidoName = sidoName;
  }

  public Sido toEntity() {
    return Sido.builder()
        .sidoCode(sidoCode)
        .sidoName(sidoName)
        .build();
  }

  public static SidoDto of(Sido payment) {
    return SidoDto.builder()
        .sidoCode(payment.getSidoCode())
        .sidoName(payment.getSidoName())
        .build();
  }

}
