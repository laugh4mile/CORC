package com.web.shinhan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;
import com.web.shinhan.entity.Sido;

@Repository
public interface SidoRepository extends JpaRepository<Sido, Integer>,
    PagingAndSortingRepository<Sido, Integer>, QueryByExampleExecutor<Sido> {

}
