package com.web.shinhan.entity;

import javax.persistence.*;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity(name = "area")
public class Area {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int areaId;

	private int userId;
	private int storeId;
	private String sidoCode;
	private String gugunCode;

	@Builder
	public Area(int areaId, int userId, int storeId, String sidoCode, String gugunCode) {
		this.areaId = areaId;
		this.userId = userId;
		this.storeId = storeId;
		this.sidoCode = sidoCode;
		this.gugunCode = gugunCode;
	}

}