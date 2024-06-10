package com.example.ceylonMart.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class MailUtil {
    @Autowired
    private JavaMailSender mailSender;

    public void sendOrderConfirmation(String toEmail, String orderId) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("shanukamalinda5888@gmail.com");
        message.setTo(toEmail);
        message.setText("Thank You for Your Order!\n" +
                "Your order (Order ID: ["+orderId+"]) has been successfully processed. Thank you for your order!");
        message.setSubject("CEYLONMART - Order Confirmation!");

        mailSender.send(message);
        System.out.println("Mail Sent!!!!!");
    }

    public void sendCustomizationConformation(String toEmail, String customizeId) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("shanukamalinda5888@gmail.com");
        message.setTo(toEmail);
        message.setText("Thank You for Your Customization Order !\n" +
                "Your order (Customization ID: ["+customizeId+"]) has been successfully processed. Thank you for your order! \n"+
                "Your product will be deliver within 30-40 days");
        message.setSubject("CEYLONMART - Order Confirmation!");

        mailSender.send(message);
        System.out.println("Mail Sent!!!!!");
    }
}
