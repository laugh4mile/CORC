package com.web.shinhan.model.mapper;

import com.web.shinhan.entity.Store;
import com.web.shinhan.model.StoreDto;
import com.web.shinhan.model.StoreDto.StoreDtoBuilder;

public class StoreMapperImpl implements StoreMapper {

  @Override
  public StoreDto storeToDto(Store store) {
    if (store == null) {
      return null;
    }

    StoreDtoBuilder storeDto = StoreDto.builder();

    storeDto.storeId(store.getStoreId());
    storeDto.crNum(store.getCrNum());
    storeDto.categoryCode(store.getCategoryCode());
    storeDto.email(store.getEmail());
    storeDto.password(store.getPassword());
    storeDto.storeName(store.getStoreName());
    storeDto.contact(store.getContact());
    storeDto.bankName(store.getBankName());
    storeDto.account(store.getAccount());
    storeDto.sidoCode(store.getSidoCode());
    storeDto.gugunCode(store.getGugunCode());
    storeDto.requestDate(store.getRequestDate());
    storeDto.total(store.getTotal());
    storeDto.accepted(store.getAccepted());
    storeDto.category(store.getCategory());
    storeDto.sido(store.getSido());
    storeDto.gugun(store.getGugun());

    return storeDto.build();
  }

}
