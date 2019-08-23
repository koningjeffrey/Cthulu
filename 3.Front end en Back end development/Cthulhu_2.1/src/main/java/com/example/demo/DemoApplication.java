package com.example.demo;

import com.example.demo.file.UploadStorage;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
        
        @Bean
    CommandLineRunner init(UploadStorage uploadStorage) {
        return (args) -> {
            uploadStorage.init();
        };
    }
}
