package com.sweetshop.sweet_shop_backend;

import com.sweetshop.sweet_shop_backend.domain.Sweet;
import com.sweetshop.sweet_shop_backend.domain.User;
import com.sweetshop.sweet_shop_backend.repository.SweetRepository;
import com.sweetshop.sweet_shop_backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class SweetShopBackendApplication {
  public static void main(String[] args) {
    SpringApplication.run(SweetShopBackendApplication.class, args);
  }

  @Bean
  CommandLineRunner seed(UserRepository users, SweetRepository sweets, PasswordEncoder encoder){
    return args -> {
      if (users.findByEmail("admin@sweetshop.com").isEmpty()) {
        users.save(User.builder()
          .email("admin@sweetshop.com")
          .passwordHash(encoder.encode("admin123"))
          .role("ADMIN")
          .build());
      }
      if (sweets.count() == 0) {
        sweets.save(Sweet.builder().name("Laddu").category("Traditional").price(25).quantity(50).build());
        sweets.save(Sweet.builder().name("Jalebi").category("Fried").price(30).quantity(40).build());
      }
    };
  }
}
