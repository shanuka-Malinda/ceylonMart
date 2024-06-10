package com.example.ceylonMart.service;

import com.example.ceylonMart.dto.ProductDto;
import com.example.ceylonMart.util.CommonResponse;

public interface ProductService {
    CommonResponse saveProduct(ProductDto productDto);
    CommonResponse getAllProducts();
    CommonResponse updateProduct(ProductDto productDto);
    CommonResponse deleteProduct(Long productId);

    CommonResponse getProductCount();

    CommonResponse getProductsByCategory(Long categoryId);
}
