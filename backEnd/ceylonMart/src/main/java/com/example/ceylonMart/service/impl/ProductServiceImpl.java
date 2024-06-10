package com.example.ceylonMart.service.impl;

import com.example.ceylonMart.constant.CommonMsg;
import com.example.ceylonMart.constant.CommonStatus;
import com.example.ceylonMart.dto.CategoryDto;
import com.example.ceylonMart.dto.ProductDto;
import com.example.ceylonMart.entity.ProductEntity;
import com.example.ceylonMart.repository.CategoryRepository;
import com.example.ceylonMart.repository.ProductRepository;
import com.example.ceylonMart.service.CategoryService;
import com.example.ceylonMart.service.ProductService;
import com.example.ceylonMart.util.CommonResponse;
import com.example.ceylonMart.util.CommonValidation;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import static org.hibernate.tool.schema.SchemaToolingLogging.LOGGER;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryService categoryService;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, CategoryService categoryService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
    }

    @Override
    public CommonResponse saveProduct(ProductDto productDto) {
        CommonResponse commonResponse = new CommonResponse();
        try {
            List<String> validationList = productValidation(productDto);
            if (!validationList.isEmpty()) {
                commonResponse.setErrorMessages(validationList);
                return commonResponse;
            }

            ProductEntity productEntity = castProductDtoToEntity(productDto);
            productEntity = productRepository.save(productEntity);
            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(productEntity));
        } catch (Exception e) {
            LOGGER.error("/**************** Exception in ProductService -> saveProduct()", e);
            commonResponse.setStatus(false);
            commonResponse.setErrorMessages(Collections.singletonList("An error occurred while saving the product."));
        }
        return commonResponse;
    }

    @Override
    public CommonResponse getAllProducts() {
        CommonResponse commonResponse = new CommonResponse();
        try {
            List<ProductDto> productDtoList = productRepository.findAll().stream()
                    .filter(productEntity -> productEntity.getCommonStatus() == CommonStatus.ACTIVE)
                    .map(this::castProductEntityToDto)
                    .collect(Collectors.toList());
            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(productDtoList));
        } catch (Exception e) {
            LOGGER.error("/**************** Exception in ProductService -> getAllProducts()", e);
            commonResponse.setStatus(false);
            commonResponse.setErrorMessages(Collections.singletonList("An error occurred while fetching products."));
        }
        return commonResponse;
    }

    @Override
    public CommonResponse updateProduct(ProductDto productDto) {
        CommonResponse commonResponse = new CommonResponse();
        try {
            if (productDto.getId() == null) {
                commonResponse.setStatus(false);
                commonResponse.setErrorMessages(Collections.singletonList("Product ID is required for update."));
                return commonResponse;
            }

            ProductEntity existingProduct = productRepository.findById(Long.valueOf(productDto.getId()))
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            existingProduct.setName(productDto.getName());
            existingProduct.setDescription(productDto.getDescription());
            existingProduct.setQty(productDto.getQty());
            existingProduct.setPrice(productDto.getPrice());
            existingProduct.setImageUrl(productDto.getImageUrl());
            existingProduct.setCategory(categoryService.findByCatId(productDto.getCategoryDto().getCategoryId()));
            existingProduct.setCommonStatus(productDto.getCommonStatus());

            productRepository.save(existingProduct);
            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(existingProduct));
        } catch (Exception e) {
            LOGGER.error("/**************** Exception in ProductService -> updateProduct()", e);
            commonResponse.setStatus(false);
            commonResponse.setErrorMessages(Collections.singletonList("An error occurred while updating the product."));
        }
        return commonResponse;
    }

    @Override
    public CommonResponse deleteProduct(Long productId) {
        CommonResponse commonResponse = new CommonResponse();
        try {
            productRepository.deleteById(productId);
            commonResponse.setStatus(true);
        } catch (Exception e) {
            LOGGER.error("/**************** Exception in ProductService -> deleteProduct()", e);
            commonResponse.setStatus(false);
            commonResponse.setErrorMessages(Collections.singletonList("An error occurred while deleting the product."));
        }
        return commonResponse;
    }

    @Override
    public CommonResponse getProductCount() {
        CommonResponse commonResponse = new CommonResponse();
        try {
            long count = productRepository.countByCommonStatus(CommonStatus.ACTIVE);
            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(count));
        } catch (Exception e) {
            LOGGER.error("/**************** Exception in ProductService -> getProductCount()", e);
            commonResponse.setStatus(false);
            commonResponse.setErrorMessages(Collections.singletonList("An error occurred while fetching product count."));
        }
        return commonResponse;
    }

    @Override
    public CommonResponse getProductsByCategory(Long categoryId) {
        CommonResponse commonResponse = new CommonResponse();
        try {
            List<ProductEntity> productEntities = productRepository.findByCategoryCategoryIdAndCommonStatus(categoryId, CommonStatus.ACTIVE);
            List<ProductDto> productDtoList = productEntities.stream()
                    .map(this::castProductEntityToDto)
                    .collect(Collectors.toList());
            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(productDtoList));
        } catch (Exception e) {
            LOGGER.error("/**************** Exception in ProductService -> getProductsByCategory()", e);
            commonResponse.setStatus(false);
            commonResponse.setErrorMessages(Collections.singletonList("An error occurred while fetching products by category."));
        }
        return commonResponse;
    }

    private ProductEntity castProductDtoToEntity(ProductDto productDto) {
        ProductEntity productEntity = new ProductEntity();
        productEntity.setName(productDto.getName());
        productEntity.setDescription(productDto.getDescription());
        productEntity.setQty(productDto.getQty());
        productEntity.setPrice(productDto.getPrice());
        productEntity.setImageUrl(productDto.getImageUrl());
        productEntity.setCategory(categoryService.findByCatId(productDto.getCategoryDto().getCategoryId()));
        productEntity.setCommonStatus(productDto.getCommonStatus());
        return productEntity;
    }

    private ProductDto castProductEntityToDto(ProductEntity productEntity) {
        ProductDto productDto = new ProductDto();
        productDto.setId(productEntity.getId().toString());
        productDto.setName(productEntity.getName());
        productDto.setDescription(productEntity.getDescription());
        productDto.setQty(productEntity.getQty());
        productDto.setPrice(productEntity.getPrice());
        productDto.setImageUrl(productEntity.getImageUrl());
        productDto.setCommonStatus(productEntity.getCommonStatus());
        productDto.setCategoryDto(categoryService.findById(productEntity.getCategory().getCategoryId()));
        return productDto;
    }

    private List<String> productValidation(ProductDto productDto) {
        List<String> validationList = new ArrayList<>();
        if (CommonValidation.stringNullValidation(productDto.getName())) {
            validationList.add(CommonMsg.EMPTY_PRODUCT_NAME);
        }
        if (CommonValidation.stringNullValidation(productDto.getDescription())) {
            validationList.add(CommonMsg.EMPTY_PRODUCT_DESCRIPTION);
        }
        return validationList;
    }
}
