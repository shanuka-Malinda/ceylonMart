package com.example.ceylonMart.controller;

import com.example.ceylonMart.dto.MailDto;
import com.example.ceylonMart.util.MailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class MailController {
    @Autowired
    MailUtil mailUtil;

    @PostMapping({"/sendmail"})
    public MailDto receiveString(@RequestBody MailDto data) {
        String sendMail = data.getSendMail();
        String orderId=data.getOrderId();

        mailUtil.sendOrderConfirmation(sendMail,orderId);
        return data;
    }

    @PostMapping("/customizationConformEmail")
    public MailDto receiveStringCus(@RequestBody MailDto data){
        String sendMail=data.getSendMail();
        String customizeId=data.getCustomizeId();
        mailUtil.sendCustomizationConformation(sendMail,customizeId);
        return data;
    }
}
