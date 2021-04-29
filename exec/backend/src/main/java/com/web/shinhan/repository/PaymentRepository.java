package com.web.shinhan.repository;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;

import com.web.shinhan.entity.Payment;
import com.web.shinhan.model.PaymentDto;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer>,
		PagingAndSortingRepository<Payment, Integer>, QueryByExampleExecutor<Payment> {

	@Query("select p from payment p where userId = :userId")
	Page<Payment> findAllByUserId(int userId, Pageable pageable);

	@Query("select p from payment p where storeId = :storeId")
	Page<Payment> findAllByStoreId(int storeId, Pageable pageable);

	@Query("select p from payment p where department = :department")
	Page<Payment> findAllByDepartment(String department, Pageable pageable);

//	@Query("select total from payment p where status = ")
//	int calcTotalExpense();

	Payment findByUserId(int userId);

	@Query("select total from payment p where status = 1")
	int findAllByStatus();

	@Query("select total from payment where date >= :startDate and date <= :endDate")
	List<Payment> findAllByMonth(LocalDateTime startDate, LocalDateTime endDate);

//	List<Payment> findByLatestUpdateBetween(Date start, Date end);
//	@Query("select total from payment where date = :date1")
//	List<Payment> findAllByMonth(String date1);
//	WHERE DATE(post_date) BETWEEN '2012-01-22' AND '2012-01-23'
}
