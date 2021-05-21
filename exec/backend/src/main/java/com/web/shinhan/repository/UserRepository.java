package com.web.shinhan.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;
import com.web.shinhan.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>,
    PagingAndSortingRepository<User, Integer>, QueryByExampleExecutor<User> {

  boolean existsByEmail(String email);

  boolean existsByEmployeeNum(int employee_num);

  boolean existsByUserId(int userId);

  User findByEmail(String email);

  User findByUserId(int userId);

  @Query("select password from user where email = :email")
  String findPwd(String email);

  boolean existsByEmailAndPassword(String email, String password);

  @Query("select cardLimit from user where active = 1")
  List<Integer> findCardLimitByActive();

  @Query("select userId from user where email = :email")
  int findUserIdByEmail(String email);

}
