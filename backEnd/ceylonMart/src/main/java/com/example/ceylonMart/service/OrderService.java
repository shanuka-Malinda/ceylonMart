package com.example.ceylonMart.service;

import com.example.ceylonMart.dto.OrderDto;
import com.example.ceylonMart.util.CommonResponse;

public interface OrderService {
    CommonResponse createOrder(OrderDto orderDto);

    CommonResponse getOrderDetail();

    long getOrderCount();

    CommonResponse getOrdersByUserId(String userId);
}
