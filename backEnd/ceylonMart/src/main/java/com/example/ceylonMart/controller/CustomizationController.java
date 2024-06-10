package com.example.ceylonMart.controller;

import com.example.ceylonMart.constant.CustomizationStatus;
import com.example.ceylonMart.dto.CustomizationDto;
import com.example.ceylonMart.service.CustomizationService;
import com.example.ceylonMart.util.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/customization")
@CrossOrigin
public class CustomizationController {
    private final CustomizationService customizationService;
    @Autowired
    public CustomizationController(CustomizationService customizationService) {
        this.customizationService = customizationService;
    }


    @PostMapping("addCustom")
    public CommonResponse saveCustomization(@RequestBody CustomizationDto customizationDto){
        return customizationService.saveCustomization(customizationDto);
    }



    @PutMapping("/updateStatus/{id}")
    public ResponseEntity<CommonResponse> updateCustomizationStatus(@PathVariable Long id, @RequestParam CustomizationStatus newStatus) {
        CommonResponse response = customizationService.updateCustomizationStatus(id, newStatus);
        return ResponseEntity.ok(response);
    }

     @GetMapping("/getAllCustomization")
    public CommonResponse getAllCustomization(){
        return customizationService.getAllCustomization();
     }

    @GetMapping("/count")
    public ResponseEntity<Long> getCustomizationCount() {
        long customizationCount = customizationService.getCustomizationCount();
        return ResponseEntity.ok(customizationCount);
    }

    @GetMapping("/user/{userId}")
    public CommonResponse getCustomizationByUserId(@PathVariable String userId) {
        return customizationService.getCustomizationByUserId(userId);
    }



    }

