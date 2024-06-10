package com.example.ceylonMart.controller;

import com.example.ceylonMart.entity.JwtRequest;
import com.example.ceylonMart.entity.JwtResponse;
import com.example.ceylonMart.service.JwtService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class JwtController {
    @Autowired
    private JwtService jwtService;

    @PostMapping("/authenticate")
 public JwtResponse crateJwtToken(@RequestBody JwtRequest jwtRequest)throws Exception{
       return jwtService.createJwtToken(jwtRequest);
    }
}
