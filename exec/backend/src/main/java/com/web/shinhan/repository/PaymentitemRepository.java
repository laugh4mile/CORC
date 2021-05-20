package com.web.shinhan.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;
import com.web.shinhan.entity.Paymentitem;

@Repository
public interface PaymentitemRepository extends JpaRepository<Paymentitem, Integer>,
    PagingAndSortingRepository<Paymentitem, Integer>, QueryByExampleExecutor<Paymentitem> {

  List<Paymentitem> findByPaymentId(int paymentId);

}
