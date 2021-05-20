package com.web.shinhan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;
import com.web.shinhan.entity.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer>,
    PagingAndSortingRepository<Admin, Integer>, QueryByExampleExecutor<Admin> {

  @Query("select password from admin where email = :email")
  String findPwd(String email);

  boolean existsByEmailAndPassword(String email, String password);

  Admin findByEmail(String email);

}
