package com.example.ceylonMart.repository;

import com.example.ceylonMart.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<CategoryEntity,Long> {

   // CategoryEntity getAllById(Long id);
}
