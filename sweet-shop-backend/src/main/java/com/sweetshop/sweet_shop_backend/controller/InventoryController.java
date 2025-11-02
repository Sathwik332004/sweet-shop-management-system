package com.sweetshop.sweet_shop_backend.controller;


import com.sweetshop.sweet_shop_backend.dto.*;
import com.sweetshop.sweet_shop_backend.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/sweets") @RequiredArgsConstructor
public class InventoryController {
  private final InventoryService inv;

  @PostMapping("/{id}/purchase")
  public ResponseEntity<Void> purchase(@PathVariable String id, @RequestBody(required=false) PurchaseRequest req){
    int qty = (req == null ? 1 : req.quantity());
    inv.purchase(id, qty);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/{id}/restock")
  public ResponseEntity<Void> restock(@PathVariable String id, @RequestBody RestockRequest req, Authentication auth){
    var isAdmin = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
    if(!isAdmin) throw new RuntimeException("Forbidden: admin only");
    inv.restock(id, req.quantity());
    return ResponseEntity.ok().build();
  }
}

