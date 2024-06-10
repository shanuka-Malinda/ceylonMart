package com.example.ceylonMart.dto;

import com.example.ceylonMart.constant.CommonStatus;
import com.example.ceylonMart.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String id;
    private String userName;
    private String contactNo;
    private String email;
    private String address;
    private String password;
    private Role role;
    private CommonStatus commonStatus;
}
