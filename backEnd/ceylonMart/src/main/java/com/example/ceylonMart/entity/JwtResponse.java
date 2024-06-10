package com.example.ceylonMart.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.User;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private Users user;
    private String jwtToken;


}
