package com.saqib.ecommercestore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.saqib.ecommercestore.model")
@EnableJpaRepositories(basePackages = "com.saqib.ecommercestore.repository")

public class EcommercestoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcommercestoreApplication.class, args);
	}

}
