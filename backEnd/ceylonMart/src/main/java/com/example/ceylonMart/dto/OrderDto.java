package com.example.ceylonMart.dto;

import com.example.ceylonMart.constant.CommonStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {
    private String orderId;
    private String quantity;
    private String orderDate;
    private String amount;
    private String transactionId;

    private String productId;
    private String productUrl;

    private String userId;
    private String userName;
    private String userAddress;
    private String userEmail;


}
