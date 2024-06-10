package com.example.ceylonMart.dto;

import com.example.ceylonMart.constant.CommonStatus;
import com.example.ceylonMart.constant.CustomizationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CustomizationDto {
    private String id;
    private String userId;
    private String description;
    private String imageUrl;
    private String contactNo;
    private String email;
    private String date;
    private CustomizationStatus customizationStatus;
    private CommonStatus commonStatus;
}
