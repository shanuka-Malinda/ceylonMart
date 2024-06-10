package com.example.ceylonMart.service;

import com.example.ceylonMart.dto.CategoryDto;
import com.example.ceylonMart.entity.CategoryEntity;
import com.example.ceylonMart.util.CommonResponse;

public interface CategoryService {
    CommonResponse saveCategory(CategoryDto categoryDto);
    CommonResponse getAllCategories();
    CommonResponse updateCategory(CategoryDto categoryDto);
    CommonResponse deleteCategory(Long categoryId);
    CategoryDto findById(Long id);
    CategoryEntity findByCatId(Long categoryId);
}
