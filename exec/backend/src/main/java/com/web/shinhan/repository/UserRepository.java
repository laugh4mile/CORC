package com.web.shinhan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;

import com.web.shinhan.entity.User;
import com.web.shinhan.model.UserDto;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>, PagingAndSortingRepository<User, Integer>, QueryByExampleExecutor<User>{
	boolean existsByEmail(String email);

	User findByEmail(String email);

	@Query("select password from user where email = :email")
	String findPwd(String email);

//	@Query("insert into user(employee_num, email, user_name, password, department, position, contact, days, balance, card_limit, active, access_time) values (:employee_num, :email, :user_name, :password, :department, :position, :contact, :days, :balance, :card_limit, :active, :access_time)")
//	UserDto regist(UserDto userDto);

//	@Query("select id_user, employee_number, email, name, password, department, position, telephone, card_limit, status, access_time, admin from user where email = :email and password = :password")
//	@Query("select u from user u where email = :email and password = :password")
	boolean existsByEmailAndPassword(String email, String password);
}
