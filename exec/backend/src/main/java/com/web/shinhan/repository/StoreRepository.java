package com.web.shinhan.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;

import com.web.shinhan.entity.Store;

@Repository
public interface StoreRepository extends JpaRepository<Store, Integer>, PagingAndSortingRepository<Store, Integer>,
		QueryByExampleExecutor<Store> {

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
