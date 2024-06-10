package com.example.ceylonMart.service.impl;

import com.example.ceylonMart.constant.CommonStatus;
import com.example.ceylonMart.dto.CategoryDto;
import com.example.ceylonMart.dto.CustomizationDto;
import com.example.ceylonMart.dto.OrderDto;
import com.example.ceylonMart.dto.ProductDto;
import com.example.ceylonMart.entity.CategoryEntity;
import com.example.ceylonMart.entity.OrderEntity;
import com.example.ceylonMart.entity.ProductEntity;
import com.example.ceylonMart.entity.Users;
import com.example.ceylonMart.repository.OrderRepository;
import com.example.ceylonMart.repository.ProductRepository;
import com.example.ceylonMart.repository.UsersRepository;
import com.example.ceylonMart.service.OrderService;
import com.example.ceylonMart.service.ProductService;
import com.example.ceylonMart.util.CommonResponse;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static org.hibernate.tool.schema.SchemaToolingLogging.LOGGER;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final UsersRepository usersRepository;
    private final ProductService productService;
    private final ProductRepository productRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, UsersRepository usersRepository, ProductService productService, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.usersRepository = usersRepository;
        this.productService = productService;
        this.productRepository = productRepository;
    }

    @Override
    public CommonResponse createOrder(OrderDto orderDto) {
        CommonResponse commonResponse = new CommonResponse();
        OrderEntity orderEntity;
        try {
            orderEntity = orderDtoToOrderEntity(orderDto);
            orderEntity = orderRepository.save(orderEntity);
            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(orderEntity));
        } catch (Exception e) {
            LOGGER.error("/**************** Exception in OrderService -> saveOrder()", e);
            commonResponse.setStatus(false);
            commonResponse.setErrorMessages(Collections.singletonList("An error occurred while saving the Order."));
        }

        return commonResponse;
    }

    @Override
    public CommonResponse getOrderDetail() {
        CommonResponse commonResponse = new CommonResponse();
        try {
            List<Object> orderDtoList = orderRepository.findAll().stream()
                    .filter(orderEntity -> orderEntity.getCommonStatus() == CommonStatus.ACTIVE)
                    .map(this::castOrderEntityToDto)
                    .collect(Collectors.toList());
            commonResponse.setStatus(true);
            commonResponse.setPayload(orderDtoList);  // Directly set the list
        } catch (Exception e) {
            LOGGER.error("/**************** Exception in OrderService -> getAllOrders()", e);
            commonResponse.setStatus(false);
            commonResponse.setErrorMessages(Collections.singletonList("An error occurred while fetching orders."));
        }
        return commonResponse;
    }

    @Override
    public long getOrderCount() {
        return orderRepository.countAllOrders();
    }

    @Override
    public CommonResponse getOrdersByUserId(String userId) {
        CommonResponse response = new CommonResponse();
        try {
            List<OrderEntity> orders = orderRepository.findByUserId(userId);
            if (orders.isEmpty()) {
                response.setStatus(false);
                response.setErrorMessages(Collections.singletonList("No orders found for the given user ID."));
            } else {
                List<OrderDto> orderDtos = orders.stream()
                        .map(this::castOrderEntityToDto)
                        .collect(Collectors.toList());
                response.setStatus(true);
                response.setPayload(Collections.singletonList(orderDtos));
            }
        } catch (Exception e) {
            LOGGER.error("Exception in OrderService -> getOrdersByUserId()", e);
            response.setStatus(false);
            response.setErrorMessages(Collections.singletonList("An error occurred while fetching orders."));
        }
        return response;
    }

    private OrderDto castOrderEntityToDto(OrderEntity orderEntity) {
         OrderDto orderDto=new OrderDto();
         orderDto.setOrderId(orderEntity.getOrderId().toString());
         orderDto.setQuantity(String.valueOf(orderEntity.getQuantity()));
         orderDto.setOrderDate(orderEntity.getOrderDate());
         orderDto.setUserId(orderEntity.getUserId());
         orderDto.setUserName(orderEntity.getUserName());
         orderDto.setUserAddress(orderEntity.getUserAddress());
         orderDto.setUserEmail(orderEntity.getUserEmail());
         orderDto.setAmount(orderEntity.getAmount());
         orderDto.setProductUrl(orderEntity.getProductUrl());
         orderDto.setProductId(orderEntity.getProductId().toString());

        return orderDto;
    }

    private OrderEntity orderDtoToOrderEntity(OrderDto orderDto) {
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setQuantity(Integer.parseInt(orderDto.getQuantity()));
        orderEntity.setOrderDate(orderDto.getOrderDate());
        orderEntity.setProductId(Long.parseLong(orderDto.getProductId()));
        orderEntity.setProductUrl(orderDto.getProductUrl());
        orderEntity.setAmount(orderDto.getAmount());
        orderEntity.setTransactionId(orderDto.getTransactionId());

        orderEntity.setUserId(orderDto.getUserId());
        orderEntity.setUserAddress(orderDto.getUserAddress());
        orderEntity.setUserEmail(orderDto.getUserEmail());
        orderEntity.setUserName(orderDto.getUserName());
        orderEntity.setCommonStatus(CommonStatus.ACTIVE);
        return orderEntity;
    }
}



