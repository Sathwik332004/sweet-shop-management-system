package com.sweetshop.sweet_shop_backend.controller;

import com.sweetshop.sweet_shop_backend.domain.*;
import com.sweetshop.sweet_shop_backend.dto.*;
import com.sweetshop.sweet_shop_backend.service.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @RequestMapping("/api/sweets") @RequiredArgsConstructor
public class SweetController {
  private final SweetService svc;

  @GetMapping public List<Sweet> all(){ return svc.all(); }

  @GetMapping("/search")
  public List<Sweet> search(@RequestParam(required=false) String name,
                            @RequestParam(required=false) String category,
                            @RequestParam(required=false) Double minPrice,
                            @RequestParam(required=false) Double maxPrice){
    return svc.search(name, category, minPrice, maxPrice);
  }

  @PostMapping
  public ResponseEntity<Sweet> create(@Valid @RequestBody SweetRequest req, Authentication auth){
    requireAdmin(auth);
    return ResponseEntity.status(HttpStatus.CREATED).body(svc.create(req));
  }

  @PutMapping("/{id}")
  public Sweet update(@PathVariable String id, @Valid @RequestBody SweetRequest req, Authentication auth){
    requireAdmin(auth);
    return svc.update(id, req);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable String id, Authentication auth){
    requireAdmin(auth);
    svc.delete(id);
    return ResponseEntity.noContent().build();
  }

  private void requireAdmin(Authentication auth){
    var isAdmin = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
    if(!isAdmin) throw new RuntimeException("Forbidden: admin only");
  }
}

