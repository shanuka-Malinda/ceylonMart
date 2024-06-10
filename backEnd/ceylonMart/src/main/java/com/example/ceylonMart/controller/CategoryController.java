package com.example.ceylonMart.controller;

import com.example.ceylonMart.dto.CategoryDto;
import com.example.ceylonMart.service.CategoryService;
import com.example.ceylonMart.util.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin
public class CategoryController {
    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }


    @PostMapping("/addCategory")
    public CommonResponse addCategory(@RequestBody CategoryDto categoryDto) {
        return categoryService.saveCategory(categoryDto);
    }

    @GetMapping("/getAllCategory")
    public CommonResponse getAllCategories() {
        return categoryService.getAllCategories();
    }

    @PutMapping("/updateCategory")
    public CommonResponse updateCategory(@RequestBody CategoryDto categoryDto) {
        return categoryService.updateCategory(categoryDto);
    }

    @DeleteMapping("deleteCategory/{id}")
    public CommonResponse deleteCategory(@PathVariable Long id) {
        return categoryService.deleteCategory(id);
    }
}
