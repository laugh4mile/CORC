package com.web.shinhan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;

import com.web.shinhan.entity.Paymentitem;
import com.web.shinhan.model.PaymentitemDto;

@Repository
public interface PaymentitemRepository extends JpaRepository<Paymentitem, Integer>,
		PagingAndSortingRepository<Paymentitem, Integer>, QueryByExampleExecutor<Paymentitem> {

//	@Query("select p from paymentitem p where storeId = :storeId and paymentId = :paymentId")
//	List<Paymentitem> findByStoreIdandPaymentId(int storeId, int paymentId);

//	@Query("select p from paymentitem p where paymentId = :paymentId")
//	List<Paymentitem> findOne(int paymentId);
	@Query("select p from paymentitem p where p.product.storeId = :storeId and paymentId = :paymentId")
	List<Paymentitem> findByStoreIdandPaymentId(int storeId, int paymentId);

//	@Query("select pd.productName from paymentitem join product as pd using(productId) where storeId = :storeId and paymentId = :paymentId")
//	List<String> findProductNameByPaymentId(int storeId, int paymentId);
//
//	@Query("select pd.price from paymentitem join product as pd using(productId) where storeId = :storeId and paymentId = :paymentId")
//	List<Integer> findPriceByPaymentId(int storeId, int paymentId);
//
//	@Query("select p.amount from paymentitem as p join product as pd using(productId) where storeId = :storeId and paymentId = :paymentId")
//	List<Integer> findAmountByPaymentId(int storeId, int paymentId);

}
