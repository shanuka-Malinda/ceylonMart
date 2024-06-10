package com.example.ceylonMart.repository;

import com.example.ceylonMart.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity,Long> {
    @Query("SELECT COUNT(o) FROM OrderEntity o")
    long countAllOrders();

    List<OrderEntity> findByUserId(String userId);
}
