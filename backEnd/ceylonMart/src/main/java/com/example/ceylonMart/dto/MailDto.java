package com.example.ceylonMart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MailDto {
    private String sendMail;
    private String subject;
    private String body;
    private String orderId;
    private String customizeId;
}
