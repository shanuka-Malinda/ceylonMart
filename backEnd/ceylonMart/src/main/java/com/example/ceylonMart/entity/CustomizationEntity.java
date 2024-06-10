package com.example.ceylonMart.entity;

import com.example.ceylonMart.constant.CommonStatus;
import com.example.ceylonMart.constant.CustomizationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "customization")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CustomizationEntity {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long id;

        @Column(name = "userId")
        private String userId;

        @Column(name = "contactNo")
        private String contactNo;

        @Column(name = "email")
        private String email;

        @Column(name = "imageUrl")
        private String imageUrl;

        @Column(name = "date")
        private String date;

        @Column(name = "description")
        private String description;

        @Enumerated
        private CustomizationStatus customizationStatus;

        @Enumerated
        private CommonStatus commonStatus;
}
