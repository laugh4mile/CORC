package com.web.shinhan.model;

import com.web.shinhan.entity.Guguncode;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data
@NoArgsConstructor
public class GuguncodeDto {
	private String gugunCode;
	private String gugunName;

	@Builder
	public GuguncodeDto(String gugunCode, String gugunName) {
		this.gugunCode = gugunCode;
		this.gugunName = gugunName;
	}
	
	public Guguncode toEntity() {
		return Guguncode.builder()
				.gugunCode(gugunCode)
				.gugunName(gugunName)
				.build();
	}

	public static GuguncodeDto of(Guguncode guguncode) {
		return GuguncodeDto.builder()
				.gugunCode(guguncode.getGugunCode())
				.gugunName(guguncode.getGugunName())
				.build();
	}


}
