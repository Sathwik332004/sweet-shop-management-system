package com.sweetshop.sweet_shop_backend.security;

import com.sweetshop.sweet_shop_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
  private final UserRepository repo;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    var u = repo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(email));
    return new org.springframework.security.core.userdetails.User(
      u.getEmail(),
      u.getPasswordHash(),
      List.of(new SimpleGrantedAuthority("ROLE_" + u.getRole()))
    );
  }
}

