package com.example.ceylonMart.controller;

import com.example.ceylonMart.dto.OrderDto;
import com.example.ceylonMart.service.OrderService;
import com.example.ceylonMart.util.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    private final OrderService orderService;
   @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/create")
    public ResponseEntity<CommonResponse> createOrder(@RequestBody OrderDto orderDto) {
        CommonResponse response = orderService.createOrder(orderDto);
        if (response.isStatus()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("/getAllOderDetail")
    public CommonResponse getOrderDetail(){
       return orderService.getOrderDetail();
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getOrderCount() {
        long orderCount = orderService.getOrderCount();
        return ResponseEntity.ok(orderCount);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<CommonResponse> getOrdersByUserId(@PathVariable String userId) {
        CommonResponse response = orderService.getOrdersByUserId(userId);
        if (response.isStatus()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(404).body(response);
        }
    }


}
