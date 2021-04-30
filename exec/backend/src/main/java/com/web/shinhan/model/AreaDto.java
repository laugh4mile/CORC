package com.web.shinhan.model;

import java.time.LocalDateTime;

import com.web.shinhan.entity.Area;
import com.web.shinhan.entity.User;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data
@NoArgsConstructor
public class AreaDto {
	private int areaId;
	private int userId;
	private int storeId;
	private String sidoCode;
	private String gugunCode;

	@Builder
	public AreaDto(int areaId, int userId, int storeId, String sidoCode, String gugunCode) {
		this.areaId = areaId;
		this.userId = userId;
		this.storeId = storeId;
		this.sidoCode = sidoCode;
		this.gugunCode = gugunCode;
	}

	public Area toEntity() {
		return Area.builder()
				.areaId(areaId)
				.userId(userId)
				.storeId(storeId)
				.sidoCode(sidoCode)
				.gugunCode(gugunCode)
				.build();
	}

	public static AreaDto of(Area area) {
		return AreaDto.builder()
				.areaId(area.getAreaId())
				.userId(area.getUserId())
				.storeId(area.getStoreId())
				.sidoCode(area.getSidoCode())
				.gugunCode(area.getGugunCode())
				.build();
	}

}
