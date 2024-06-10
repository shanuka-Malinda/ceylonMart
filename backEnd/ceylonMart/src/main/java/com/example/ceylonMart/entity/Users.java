package com.example.ceylonMart.entity;


import lombok.ToString;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Users")
public class Users {

    @Id
    private String userName;
    private String adress;
    private String tel;
    private String email;
    private String userPassword;
    private String userId;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "USER_ROLE",
            joinColumns = {
                    @JoinColumn(name = "USER_ID")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "ROLE_ID")
            }
    )
    private Set<Role> role;
//Hirun aiya----------------------code>
//    @ManyToMany
//    @JoinTable(
//            name="user_order",
//            joinColumns = @JoinColumn(name = "userId"),
//            inverseJoinColumns = @JoinColumn(name = "orderId")
//    )
//    private List<OrderEntity> orders;



//@ManyToMany
//@JoinTable(
//        name = "user_order",
//        joinColumns = @JoinColumn(name = "user_id"),
//        inverseJoinColumns = @JoinColumn(name = "order_id")
//)
//private List<OrderEntity> orders;
//






    public Users(){}

//    public List<OrderEntity> getOrders() {
//        return orders;
//    }
//
//    public void setOrders(List<OrderEntity> orders) {
//        this.orders = orders;
//    }
//
//    public Users(List<OrderEntity> orders) {
//        this.orders = orders;
//    }

    public Users(String adress, String tel, String email, String userPassword, Set<Role> role) {
        this.adress = adress;
        this.tel = tel;
        this.email = email;
        this.userPassword = userPassword;
        this.role = role;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public Set<Role> getRole() {
        return role;
    }

    public void setRole(Set<Role> role) {
        this.role = role;
    }
}