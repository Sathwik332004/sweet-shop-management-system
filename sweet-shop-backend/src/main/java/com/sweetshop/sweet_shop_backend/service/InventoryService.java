package com.sweetshop.sweet_shop_backend.service;

import com.sweetshop.sweet_shop_backend.exception.*;
import com.sweetshop.sweet_shop_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InventoryService {
  private final SweetRepository repo;

  @Transactional
  public void purchase(String id, int qty){
    var s = repo.findById(id).orElseThrow(() -> new NotFoundException("Sweet not found"));
    if(qty <= 0) throw new IllegalArgumentException("Invalid quantity");
    if(s.getQuantity() < qty) throw new IllegalStateException("Out of stock");
    s.setQuantity(s.getQuantity() - qty);
    repo.save(s);
  }

  @Transactional
  public void restock(String id, int qty){
    if(qty <= 0) throw new IllegalArgumentException("Invalid quantity");
    var s = repo.findById(id).orElseThrow(() -> new NotFoundException("Sweet not found"));
    s.setQuantity(s.getQuantity() + qty);
    repo.save(s);
  }
}

