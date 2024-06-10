package com.example.ceylonMart.controller;

import com.example.ceylonMart.constant.CommonStatus;
import com.example.ceylonMart.dto.ProductDto;
import com.example.ceylonMart.service.ProductService;
import com.example.ceylonMart.util.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/product")
@CrossOrigin
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/saveProduct")
    public CommonResponse saveProduct(@RequestBody ProductDto productDto) {
        return productService.saveProduct(productDto);
    }

    @GetMapping("getAllProduct")
    public CommonResponse getAllProducts() {
        return productService.getAllProducts();
    }

    @PutMapping("/updateProduct")
    public CommonResponse updateProduct(@RequestBody ProductDto productDto) {
        return productService.updateProduct(productDto);
    }

    @DeleteMapping("deleteProduct/{id}")
    public CommonResponse deleteProduct(@PathVariable Long id) {
        return productService.deleteProduct(id);
    }


    @GetMapping("/count")
    public CommonResponse getProductCount() {
        return productService.getProductCount();
    }

    @GetMapping("/category/{categoryId}")
    public CommonResponse getProductsByCategory(@PathVariable Long categoryId) {
        return productService.getProductsByCategory(categoryId);
    }





}
