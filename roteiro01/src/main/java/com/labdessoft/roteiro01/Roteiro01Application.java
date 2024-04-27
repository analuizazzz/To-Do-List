package com.labdessoft.roteiro01;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.labdessoft.roteiro01.entity")
public class Roteiro01Application {

	public static void main(String[] args) {
		SpringApplication.run(Roteiro01Application.class, args);
	}
				
}
