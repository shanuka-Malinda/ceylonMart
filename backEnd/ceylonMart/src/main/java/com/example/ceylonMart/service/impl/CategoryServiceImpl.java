package com.example.ceylonMart.service.impl;

import com.example.ceylonMart.dto.CategoryDto;
import com.example.ceylonMart.entity.CategoryEntity;
import com.example.ceylonMart.repository.CategoryRepository;
import com.example.ceylonMart.service.CategoryService;
import com.example.ceylonMart.util.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static org.hibernate.tool.schema.SchemaToolingLogging.LOGGER;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public CommonResponse saveCategory(CategoryDto categoryDto) {
        CommonResponse commonResponse = new CommonResponse();
        try {
            CategoryEntity categoryEntity = castCategoryDtoToEntity(categoryDto);
            categoryEntity = categoryRepository.save(categoryEntity);
            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(categoryEntity));
        } catch (Exception e) {
            LOGGER.error("/**************** Exception in CategoryService -> saveCategory()", e);
            commonResponse.setStatus(false);
            commonResponse.setErrorMessages(Collections.singletonList("An error occurred while saving the category."));
        }
        return commonResponse;
    }

    @Override
    public CommonResponse getAllCategories() {
        CommonResponse commonResponse = new CommonResponse();
        try {
            List<CategoryDto> categoryDtoList = categoryRepository.findAll().stream()
                    .map(this::castCategoryEntityToDto)
                    .collect(Collectors.toList());
            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(categoryDtoList));
        } catch (Exception e) {
            LOGGER.error("/**************** Exception in CategoryService -> getAllCategories()", e);
            commonResponse.setStatus(false);
            commonResponse.setErrorMessages(Collections.singletonList("An error occurred while fetching categories."));
        }
        return commonResponse;
    }

    @Override
    public CommonResponse updateCategory(CategoryDto categoryDto) {
        CommonResponse commonResponse = new CommonResponse();
        try {
            if (categoryDto.getCategoryId() == null) {
                commonResponse.setStatus(false);
                commonResponse.setErrorMessages(Collections.singletonList("Category ID is required for update."));
                return commonResponse;
            }

            CategoryEntity existingCategory = categoryRepository.findById(categoryDto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));

            existingCategory.setName(categoryDto.getName());
            categoryRepository.save(existingCategory);

            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(existingCategory));
        } catch (Exception e) {
            LOGGER.error("/**************** Exception in CategoryService -> updateCategory()", e);
            commonResponse.setStatus(false);
            commonResponse.setErrorMessages(Collections.singletonList("An error occurred while updating the category."));
        }
        return commonResponse;
    }

    @Override
    public CommonResponse deleteCategory(Long categoryId) {
        CommonResponse commonResponse = new CommonResponse();
        try {
            categoryRepository.deleteById(categoryId);
            commonResponse.setStatus(true);
        } catch (Exception e) {
            LOGGER.error("/**************** Exception in CategoryService -> deleteCategory()", e);
            commonResponse.setStatus(false);
            commonResponse.setErrorMessages(Collections.singletonList("An error occurred while deleting the category."));
        }
        return commonResponse;
    }

    @Override
    public CategoryDto findById(Long id) {
        CategoryEntity categoryEntity = categoryRepository.findById(id).orElse(null);
        return castCategoryEntityToDto(categoryEntity);
    }

    @Override
    public CategoryEntity findByCatId(Long categoryId) {
        CategoryEntity categoryEntity= categoryRepository.findById(categoryId).orElse(null);
        return  categoryEntity;
       //  return null;
    }

    private CategoryEntity castCategoryDtoToEntity(CategoryDto categoryDto) {
        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setCategoryId(categoryDto.getCategoryId());
        categoryEntity.setName(categoryDto.getName());
        return categoryEntity;
    }

    private CategoryDto castCategoryEntityToDto(CategoryEntity categoryEntity) {
        if (categoryEntity == null) return null;
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setCategoryId(categoryEntity.getCategoryId());
        categoryDto.setName(categoryEntity.getName());
        return categoryDto;
    }
}
