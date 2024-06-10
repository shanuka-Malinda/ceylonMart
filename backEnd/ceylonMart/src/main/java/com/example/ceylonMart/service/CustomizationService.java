package com.example.ceylonMart.service;

import com.example.ceylonMart.constant.CustomizationStatus;
import com.example.ceylonMart.dto.CustomizationDto;
import com.example.ceylonMart.util.CommonResponse;
import org.springframework.stereotype.Service;


public interface CustomizationService {
    CommonResponse saveCustomization(CustomizationDto customizationDto);

    CommonResponse updateCustomizationStatus(Long id, CustomizationStatus newStatus);

    CommonResponse getAllCustomization();

    long getCustomizationCount();

    CommonResponse getCustomizationByUserId(String userId);
}
