package com.web.shinhan.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;

import com.web.shinhan.entity.Payment;
import com.web.shinhan.entity.Store;
import com.web.shinhan.model.UserDto;

@Repository
public interface StoreRepository extends JpaRepository<Store, Integer>, PagingAndSortingRepository<Store, Integer>,
		QueryByExampleExecutor<Store> {
	boolean existsByEmail(String email);

	boolean existsByEmployeeNum(int employee_num);

//	boolean findByStoreId(int storeId);

	Store findByEmail(String email);

	Store findByStoreId(int storeId);

	@Query("select password from store where email = :email")
	String findPwd(String email);

	boolean existsByEmailAndPassword(String email, String password);

//	@Query("insert into user(employee_num, email, user_name, password, department, position, contact, days, balance, card_limit, active, access_time) values (:employee_num, :email, :user_name, :password, :department, :position, :contact, :days, :balance, :card_limit, :active, :access_time)")
//	UserDto regist(UserDto userDto);

//	@Query("select id_user, employee_number, email, name, password, department, position, telephone, card_limit, status, access_time, admin from user where email = :email and password = :password")
//	@Query("select u from user u where email = :email and password = :password")

}
