package com.sweetshop.sweet_shop_backend.service;

import com.sweetshop.sweet_shop_backend.domain.*;
import com.sweetshop.sweet_shop_backend.dto.*;
import com.sweetshop.sweet_shop_backend.repository.*;
import com.sweetshop.sweet_shop_backend.security.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final UserRepository users;
  private final PasswordEncoder encoder;
  private final JwtUtils jwt;

  public AuthResponse register(RegisterRequest req){
    users.findByEmail(req.email()).ifPresent(u -> { throw new RuntimeException("Email already used"); });
    var user = users.save(User.builder()
      .email(req.email())
      .passwordHash(encoder.encode(req.password()))
      .role("USER")
      .build());
    var token = jwt.generate(user.getEmail(), user.getRole());
    return new AuthResponse(token, user.getRole(), user.getEmail());
  }

  public AuthResponse login(LoginRequest req){
    var user = users.findByEmail(req.email()).orElseThrow(() -> new RuntimeException("Invalid credentials"));
    if(!encoder.matches(req.password(), user.getPasswordHash())) throw new RuntimeException("Invalid credentials");
    var token = jwt.generate(user.getEmail(), user.getRole());
    return new AuthResponse(token, user.getRole(), user.getEmail());
  }
}

