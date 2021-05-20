package com.web.shinhan.repository;

import java.time.LocalDateTime;
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

  @Query(
      value = "select p.paymentId, p.userId, p.storeId, p.total, p.date, p.status, p.testCode, p.transactionId from payment p inner join (select s.storeId from store s where s.accepted = 2) as t using(storeId)",
      countQuery = "select count(*) from payment p inner join (select s.storeId from store s where s.accepted = 2) as t using(storeId)",
      nativeQuery = true)
  Page<Payment> findAll(Pageable pageable);

  @Query("select p from payment p where userId = :userId")
  Page<Payment> findAllByUserId(int userId, Pageable pageable);

  @Query("select p from payment p where storeId = :storeId")
  Page<Payment> findAllByStoreId(int storeId, Pageable pageable);

  @Query("select p from payment p where storeId = :storeId")
  List<Payment> findByStoreId(int storeId);

  @Query("select p from payment p where department = :department")
  Page<Payment> findAllByDepartment(String department, Pageable pageable);

  @Query("select p from payment p where status != 0")
  List<Payment> findAllByStatus();

  @Query(
      value = "select p.total from payment p join store s using(storeId) where p.status != 0 and s.accepted = 2",
      nativeQuery = true)
  List<Integer> calcTotalExpense();

  Payment findByPaymentId(int userId);

  @Query(
      value = "select p.total from payment p join store s using(storeId) where p.status = 1 and s.accepted = 2",
      nativeQuery = true)
  List<Integer> findTotalByStatus();

  @Query("select storeId, sum(total) as total from payment group by storeId")
  List<Integer[]> findTotalByStatusandStoreId();

  @Query("select total from payment where date between :startDate and :endDate and status != 0")
  List<Integer> findAllByMonth(LocalDateTime startDate, LocalDateTime endDate);

  @Query("select total from payment where date between :startDate and :endDate and status = 2")
  List<Integer> confirmedByMonth(LocalDateTime startDate, LocalDateTime endDate);

  @Query("select total from payment where storeId = :storeId and status != 0 and date between :startDate and :endDate")
  List<Integer> findTotalByStoreId(int storeId, LocalDateTime startDate, LocalDateTime endDate);

  @Query("select total from payment where storeId = :storeId and status = 1")
  List<Integer> findNotConfirmedByStoreId(int storeId);

  @Query("select p from payment p where userId = :userId and date between :startDate and :endDate")
  Page<Payment> findAllByCustom(int userId, Pageable pageable, LocalDateTime startDate,
      LocalDateTime endDate);

  Payment findTop1ByOrderByPaymentIdDesc();

  @Query("select count(p) from payment p where storeId = :storeId")
  int countStorePayment(int storeId);

  @Query("select count(p) from payment p where userId = :userId")
  int countUserPayment(int userId);

  @Query("select p from payment p where storeId= :storeId and date between :startDate and :endDate")
  Page<Payment> findAllByStoreCustom(int storeId, Pageable pageable, LocalDateTime startDate,
      LocalDateTime endDate);
}
