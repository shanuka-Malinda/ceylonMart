package com.example.ceylonMart.entity;


import com.example.ceylonMart.constant.CommonStatus;
import com.example.ceylonMart.util.CommonResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "Orders")
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long orderId;

    @Column
    private int quantity;

    @Column
    private String orderDate;

    @Column
    private Long productId;

    @Column
    private String productUrl;

    @Column
    private String userId;

    @Column
    private String userAddress;

    @Column
    private String userEmail;

    @Column
    private String userName;

    @Column
    private String amount;

    @Column
    private String transactionId;

    @Enumerated
    private CommonStatus commonStatus;

//    @ManyToMany
//    @JoinTable(
//            name="product_order",
//            joinColumns = @JoinColumn(name = "orderId"),
//            inverseJoinColumns = @JoinColumn(name = "id")
//    )
//    private List<ProductEntity> products;

//    @ManyToMany(mappedBy = "orders")
//    private List<Users> users;


//    @ManyToMany(mappedBy = "orders")
//    private List<Users> users;

}
