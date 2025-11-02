package com.sweetshop.sweet_shop_backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {
  private final byte[] key;
  private final long expiryMs;

  public JwtUtils(@Value("${app.jwt.secret}") String secret,
                  @Value("${app.jwt.expires-in-ms}") long expiryMs) {
    this.key = secret.getBytes();
    this.expiryMs = expiryMs;
  }

  public String generate(String email, String role) {
    return Jwts.builder()
      .setSubject(email)
      .claim("role", role)
      .setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis() + expiryMs))
      .signWith(Keys.hmacShaKeyFor(key), SignatureAlgorithm.HS256)
      .compact();
  }

  public Jws<Claims> parse(String token) {
    return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
  }
}

