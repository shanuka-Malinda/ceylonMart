package com.example.ceylonMart.repository;

import com.example.ceylonMart.constant.CommonStatus;
import com.example.ceylonMart.dto.ProductDto;
import com.example.ceylonMart.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity,Long> {

    List<ProductEntity> getAllById(Long productId);


    long countByCommonStatus(CommonStatus commonStatus);

    List<ProductEntity> findByCategoryCategoryIdAndCommonStatus(Long categoryId, CommonStatus commonStatus);
}
