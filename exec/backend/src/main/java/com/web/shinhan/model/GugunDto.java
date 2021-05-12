package com.web.shinhan.model;

import com.web.shinhan.entity.Gugun;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data
@NoArgsConstructor
public class GugunDto {

  private String gugunCode;
  private String gugunName;

  @Builder
  public GugunDto(String gugunCode, String gugunName) {
    this.gugunCode = gugunCode;
    this.gugunName = gugunName;
  }

  public Gugun toEntity() {
    return Gugun.builder()
        .gugunCode(gugunCode)
        .gugunName(gugunName)
        .build();
  }

  public static GugunDto of(Gugun guguncode) {
    return GugunDto.builder()
        .gugunCode(guguncode.getGugunCode())
        .gugunName(guguncode.getGugunName())
        .build();
  }


}
