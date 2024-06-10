package com.example.ceylonMart.service.impl;

import com.example.ceylonMart.constant.CommonStatus;
import com.example.ceylonMart.constant.CustomizationStatus;
import com.example.ceylonMart.dto.CustomizationDto;
import com.example.ceylonMart.dto.ProductDto;
import com.example.ceylonMart.entity.CustomizationEntity;
import com.example.ceylonMart.repository.CustomizationRepository;
import com.example.ceylonMart.service.CustomizationService;
import com.example.ceylonMart.util.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.hibernate.tool.schema.SchemaToolingLogging.LOGGER;

@Service
public class CustomizationServiceImpl implements CustomizationService {
    private final CustomizationRepository customizationRepository;

    @Autowired
    public CustomizationServiceImpl(CustomizationRepository customizationRepository) {
        this.customizationRepository = customizationRepository;
    }

    @Override
    public CommonResponse saveCustomization(CustomizationDto customizationDto) {
        CommonResponse commonResponse = new CommonResponse();
        try {
            List<String> validationList = customizationValidation(customizationDto);
            if (!validationList.isEmpty()) {
                commonResponse.setErrorMessages(validationList);
                return commonResponse;
            }

            CustomizationEntity customizationEntity = castCustomDtoToEntity(customizationDto);
            customizationEntity = customizationRepository.save(customizationEntity);
            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(customizationEntity));
        } catch (Exception e) {
            LOGGER.error("/**************** Exception in CustomizationService -> saveCustomization()", e);
            commonResponse.setStatus(false);
            commonResponse.setErrorMessages(Collections.singletonList("An error occurred while saving the customization."));
        }
        return commonResponse;
    }

    @Override
    public CommonResponse updateCustomizationStatus(Long id, CustomizationStatus newStatus) {
        CommonResponse commonResponse = new CommonResponse();
        try {
            Optional<CustomizationEntity> optionalCustomization = customizationRepository.findById(id);
            if (optionalCustomization.isEmpty()) {
                commonResponse.setStatus(false);
                commonResponse.setErrorMessages(Collections.singletonList("Customization not found."));
                return commonResponse;
            }
            CustomizationEntity customizationEntity = optionalCustomization.get();
            customizationEntity.setCustomizationStatus(newStatus);
            customizationRepository.save(customizationEntity);
            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(customizationEntity));
        } catch (Exception e) {
            LOGGER.error("Exception in CustomizationService -> updateCustomizationStatus()", e);
            commonResponse.setStatus(false);
            commonResponse.setErrorMessages(Collections.singletonList("An error occurred while updating the customization status."));
        }
        return commonResponse;
    }

    @Override
    public CommonResponse getAllCustomization() {
        CommonResponse commonResponse = new CommonResponse();
        try {
            List<Object> customList = customizationRepository.findAll().stream()
                    .filter(customizationEntity -> customizationEntity.getCommonStatus() == CommonStatus.ACTIVE)
                    .map(this::castCustomizationEntityToDto)
                    .collect(Collectors.toList());
            commonResponse.setStatus(true);
            commonResponse.setPayload(customList);
        } catch (Exception e) {
            LOGGER.error("/**************** Exception in CustomizationService -> getAllCustomization()", e);
            commonResponse.setStatus(false);
            commonResponse.setErrorMessages(Collections.singletonList("An error occurred while fetching Customization."));
        }
        return commonResponse;
    }

    @Override
    public long getCustomizationCount() {
        return customizationRepository.countAllCustomizations();
    }

    @Override
    public CommonResponse getCustomizationByUserId(String userId) {
        CommonResponse commonResponse = new CommonResponse();
        try {
            List<CustomizationEntity> customizations = customizationRepository.findByUserId(userId);
            if (customizations.isEmpty()) {
                commonResponse.setStatus(false);
                commonResponse.setErrorMessages(Collections.singletonList("No customizations found for the given user ID."));
                return commonResponse;
            }
            List<CustomizationDto> customizationDto = customizations.stream()
                    .map(this::castCustomizationEntityToDto)
                    .collect(Collectors.toList());
            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(customizationDto));
        } catch (Exception e) {
            LOGGER.error("Exception in CustomizationService -> getCustomizationByUserId()", e);
            commonResponse.setStatus(false);
            commonResponse.setErrorMessages(Collections.singletonList("An error occurred while fetching customizations by user ID."));
        }
        return commonResponse;
    }

    private CustomizationDto castCustomizationEntityToDto(CustomizationEntity customizationEntity) {
        CustomizationDto customizationDto = new CustomizationDto();
        customizationDto.setId(customizationEntity.getId().toString());
        customizationDto.setUserId(customizationEntity.getUserId());
        customizationDto.setDate(customizationEntity.getDate());
        customizationDto.setEmail(customizationEntity.getEmail());
        customizationDto.setDescription(customizationEntity.getDescription());
        customizationDto.setContactNo(customizationEntity.getContactNo());
        customizationDto.setImageUrl(customizationEntity.getImageUrl());
        customizationDto.setCustomizationStatus(customizationEntity.getCustomizationStatus());
        customizationDto.setCommonStatus(customizationEntity.getCommonStatus());
        return customizationDto;
    }

    private CustomizationEntity castCustomDtoToEntity(CustomizationDto customizationDto) {
        CustomizationEntity customizationEntity = new CustomizationEntity();
        customizationEntity.setCustomizationStatus(customizationDto.getCustomizationStatus());
        customizationEntity.setDate(customizationDto.getDate());
        customizationEntity.setImageUrl(customizationDto.getImageUrl());
        customizationEntity.setUserId(customizationDto.getUserId());
        customizationEntity.setDescription(customizationDto.getDescription());
        customizationEntity.setCommonStatus(customizationDto.getCommonStatus());
        customizationEntity.setContactNo(customizationDto.getContactNo());
        customizationEntity.setEmail(customizationDto.getEmail());
        return customizationEntity;
    }

    private List<String> customizationValidation(CustomizationDto customizationDto) {
        List<String> errors = new ArrayList<>();
        if (customizationDto.getUserId() == null || customizationDto.getUserId().isEmpty()) {
            errors.add("User ID is required.");
        }
        if (customizationDto.getEmail() == null || customizationDto.getEmail().isEmpty()) {
            errors.add("Email is required.");
        }
        // Add more validation rules as needed
        return errors;
    }


}
