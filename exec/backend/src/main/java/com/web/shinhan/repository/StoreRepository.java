package com.web.shinhan.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;
import com.web.shinhan.entity.Store;

@Repository
public interface StoreRepository extends JpaRepository<Store, Integer>,
    PagingAndSortingRepository<Store, Integer>, QueryByExampleExecutor<Store> {

  @Query(
      value = "select s.storeId, s.crNum, s.categoryCode, s.email, s.password, s.storeName, s.contact, s.bankName, s.account, s.sidoCode, s.gugunCode, s.requestDate, s.accepted, s.testCode, temp.total from store s left join (select sum(total) as total, storeId from payment where status = 1 group by storeId) as temp using(storeId) where s.accepted = 2",
      countQuery = "select count(*) from store s left join (select sum(total) as total, storeId from payment where status = 1 group by storeId) as temp using(storeId)",
      nativeQuery = true)
  List<Store> findAll();

  @Query(
      value = "select s.storeId, s.crNum, s.categoryCode, s.email, s.password, s.storeName, s.contact, s.bankName, s.account, s.sidoCode, s.gugunCode, s.requestDate, s.accepted, s.testCode, temp.total from store s left join (select sum(total) as total, storeId from payment where status = 1 group by storeId) as temp using(storeId) where s.accepted = 2",
      countQuery = "select count(*) from store s left join (select sum(total) as total, storeId from payment where status = 1 group by storeId) as temp using(storeId)",
      nativeQuery = true)
  Page<Store> findAll(Pageable pageable);

  Store findByEmail(String email);

  Store findByStoreId(int storeId);

  @Query("select password from store where email = :email")
  String findPwd(String email);

  boolean existsByEmailAndPassword(String email, String password);

  @Query("select s from store s where accepted = 1")
  Page<Store> findAllUnassignedStore(Pageable pageable);

  boolean existsByCrNum(String crNum);

  boolean existsByEmail(String email);

}
