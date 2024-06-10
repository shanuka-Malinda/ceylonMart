package com.example.ceylonMart.dto;

import com.example.ceylonMart.constant.CommonStatus;
import com.example.ceylonMart.entity.CategoryEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    private String id;
    private String name;
    private String description;
    private String qty;
    private String price;
    private String imageUrl;
    private CategoryDto categoryDto;
    private CommonStatus commonStatus;
}
