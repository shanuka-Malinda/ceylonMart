package com.example.ceylonMart.repository;

import com.example.ceylonMart.entity.CustomizationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomizationRepository extends JpaRepository<CustomizationEntity ,Long> {
    @Query("SELECT COUNT(c) FROM CustomizationEntity c")
    long countAllCustomizations();

    List<CustomizationEntity> findByUserId(String userId);

}
