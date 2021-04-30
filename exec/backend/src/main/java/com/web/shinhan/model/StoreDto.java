package com.web.shinhan.model;

import java.time.LocalDateTime;

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
	private int categoryCode;
	private String email;
	private String password;
	private String storeName;
	private String contact;
	private String bankName;
	private int account;
	private LocalDateTime requestDate;
	private int accepted;

	@Builder
	public StoreDto(int storeId, String crNum, int categoryCode, String email, String password, String storeName,
			String contact, String bankName, int account, LocalDateTime requestDate, int accepted) {
		this.storeId = storeId;
		this.crNum = crNum;
		this.categoryCode = categoryCode;
		this.email = email;
		this.password = password;
		this.storeName = storeName;
		this.contact = contact;
		this.bankName = bankName;
		this.account = account;
		this.requestDate = requestDate;
		this.accepted = accepted;
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
				.requestDate(requestDate)
				.accepted(accepted)
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
				.requestDate(store.getRequestDate())
				.accepted(store.getAccepted())
				.build();
	}

}