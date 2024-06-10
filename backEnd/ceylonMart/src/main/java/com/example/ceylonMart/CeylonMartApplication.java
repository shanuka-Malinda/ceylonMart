package com.example.ceylonMart;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "CeylonMart API",version = "2.0",description = "test"))
public class CeylonMartApplication {

	public static void main(String[] args) {
		SpringApplication.run(CeylonMartApplication.class, args);
	}

}
