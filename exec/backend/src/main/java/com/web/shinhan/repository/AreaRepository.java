package com.web.shinhan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;

import com.web.shinhan.entity.Area;

@Repository
public interface AreaRepository
		extends JpaRepository<Area, Integer>, PagingAndSortingRepository<Area, Integer>, QueryByExampleExecutor<Area> {

}
