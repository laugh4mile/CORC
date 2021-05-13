package com.web.shinhan.model.service;

import java.time.LocalDateTime;
import java.util.List;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.web.shinhan.entity.Payment;
import com.web.shinhan.entity.Store;
import com.web.shinhan.model.StoreDto;
import com.web.shinhan.model.mapper.StoreMapper;
import com.web.shinhan.repository.PaymentRepository;
import com.web.shinhan.repository.StoreRepository;

@Service
public class StoreService {

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  private StoreRepository storeRepository;

  @Autowired
  private PaymentRepository paymentRepository;

  private final StoreMapper mapper = Mappers.getMapper(StoreMapper.class);

  @Transactional
  public Page<StoreDto> findAllStore(Pageable pageable) {
    Page<Store> stores = storeRepository.findAll(pageable);
    return stores.map(StoreDto::of);
  }

  @Transactional
  public Page<StoreDto> findAllUnassignedStore(Pageable pageable) {
    Page<Store> stores = storeRepository.findAllUnassignedStore(pageable);
    return stores.map(StoreDto::of);
  }

  public StoreDto findStoreInfo(int storeId) {
    Store storeInfo = storeRepository.findByStoreId(storeId);
    StoreDto storeDto = mapper.INSTANCE.storeToDto(storeInfo);
    return storeDto;
  }

  public boolean emailCheck(String email) {
    boolean result = storeRepository.existsByEmail(email);
    return result;
  }

  @Transactional
  public void registStore(StoreDto storeDto) {
    String encodePassword = passwordEncoder.encode(storeDto.getPassword());
    storeDto.setPassword(encodePassword);
    storeDto.setRequestDate(LocalDateTime.now());
    storeDto.setAccepted(1);
    Store storeEntity = storeDto.toEntity();
    storeRepository.save(storeEntity);
    storeDto.setStoreId(storeEntity.getStoreId());
  }

  public boolean modifyStoreInfo(String email, StoreDto newDto) {
    Store storeInfo = storeRepository.findByEmail(email);
    StoreDto storeDto = mapper.INSTANCE.storeToDto(storeInfo);
    String encodePassword = passwordEncoder.encode(newDto.getPassword());
    storeDto.setCrNum(newDto.getCrNum());
    storeDto.setCategoryCode(newDto.getCategoryCode());
    storeDto.setEmail(newDto.getEmail());
    storeDto.setPassword(newDto.getPassword());
    storeDto.setStoreName(newDto.getStoreName());
    storeDto.setContact(newDto.getContact());
    storeDto.setBankName(newDto.getBankName());
    storeDto.setAccount(newDto.getAccount());
    storeDto.setSidoCode(newDto.getSidoCode());
    storeDto.setGugunCode(newDto.getGugunCode());
    storeDto.setRequestDate(newDto.getRequestDate());
    storeDto.setAccepted(newDto.getAccepted());
    storeRepository.save(storeDto.toEntity());

    newDto.setPassword(encodePassword);
    newDto.setStoreId(storeDto.getStoreId());
    if (newDto.equals(storeDto)) {
      return true;
    }
    return false;
  }

  @Transactional
  public int allowStoreApplication(int storeId) {
    Store store = storeRepository.findByStoreId(storeId);
    if (store.getAccepted() != 2) {
      StoreDto storeDto = mapper.INSTANCE.storeToDto(store);
      storeDto.setAccepted(2);
      storeRepository.save(storeDto.toEntity());
      return 1;
    }
    return 0;
  }

  @Transactional
  public int denyStoreApplication(int storeId) {
    Store store = storeRepository.findByStoreId(storeId);
    if (store.getAccepted() != 0) {
      StoreDto storeDto = mapper.INSTANCE.storeToDto(store);
      storeDto.setAccepted(0);
      storeRepository.save(storeDto.toEntity());
      return 1;
    }
    return 0;
  }

  public boolean login(StoreDto storeDto) {
    String encodedPassword = storeRepository.findPwd(storeDto.getEmail());
    Store dbStore = storeRepository.findByEmail(storeDto.getEmail());
    if (passwordEncoder.matches(storeDto.getPassword(), encodedPassword)
        && storeDto.getEmail().equals(dbStore.getEmail())) {
      storeDto.setPassword(encodedPassword);
      boolean result = storeRepository
          .existsByEmailAndPassword(storeDto.getEmail(), storeDto.getPassword());
      return result;
    } else {
      return false;
    }
  }

  public StoreDto findStoreByEmail(String email) {
    Store storeInfo = storeRepository.findByEmail(email);
    StoreDto storeDto = mapper.INSTANCE.storeToDto(storeInfo);
    return storeDto;
  }

  public boolean checkCrNum(String crNum) {
    return storeRepository.existsByCrNum(crNum);
  }

  public int countStore() {
    int count = (int) storeRepository.count();
    return count;
  }

}