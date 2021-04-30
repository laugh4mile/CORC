package com.web.shinhan.model;

import com.web.shinhan.entity.Sidocode;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data
@NoArgsConstructor
public class SidocodeDto {
	private String sidoCode;
	private String sidoName;

	@Builder
	public SidocodeDto(String sidoCode, String sidoName) {
		this.sidoCode = sidoCode;
		this.sidoName = sidoName;
	}
	
	public Sidocode toEntity() {
		return Sidocode.builder()
				.sidoCode(sidoCode)
				.sidoName(sidoName)
				.build();
	}

	public static SidocodeDto of(Sidocode payment) {
		return SidocodeDto.builder()
				.sidoCode(payment.getSidoCode())
				.sidoName(payment.getSidoName())
				.build();
	}


}
