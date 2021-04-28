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

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer>,
		PagingAndSortingRepository<Payment, Integer>, QueryByExampleExecutor<Payment> {

	@Query("select p from payment p where userId = :userId")
	Page<Payment> findAll(int userId, Pageable pageable);

//	boolean existsByEmployeeNum(int employee_num);

//	User findByUser_Id(int user_id);

//	User findByEmail(String email);

//	@Query("insert into user(employee_num, email, user_name, password, department, position, contact, days, balance, card_limit, active, access_time) values (:employee_num, :email, :user_name, :password, :department, :position, :contact, :days, :balance, :card_limit, :active, :access_time)")
//	UserDto regist(UserDto userDto);

//	@Query("select id_user, employee_number, email, name, password, department, position, telephone, card_limit, status, access_time, admin from user where email = :email and password = :password")
//	boolean existsByEmailAndPassword(String email, String password);
}
