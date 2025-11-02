package com.sweetshop.sweet_shop_backend.service;

import com.sweetshop.sweet_shop_backend.domain.*;
import com.sweetshop.sweet_shop_backend.dto.*;
import com.sweetshop.sweet_shop_backend.exception.*;
import com.sweetshop.sweet_shop_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SweetService {
  private final SweetRepository repo;

  public Sweet create(SweetRequest r){
    return repo.save(Sweet.builder()
      .name(r.name()).category(r.category()).price(r.price()).quantity(r.quantity()).build());
  }

  public List<Sweet> all(){ return repo.findAll(); }

  public List<Sweet> search(String name, String category, Double minPrice, Double maxPrice){
    if (name != null && !name.isBlank()) return repo.findByNameContainingIgnoreCase(name);
    if (category != null && !category.isBlank()) return repo.findByCategoryIgnoreCase(category);
    if (minPrice != null && maxPrice != null) return repo.findByPriceBetween(minPrice, maxPrice);
    return repo.findAll();
  }

  public Sweet update(String id, SweetRequest r){
    var s = repo.findById(id).orElseThrow(() -> new NotFoundException("Sweet not found"));
    s.setName(r.name()); s.setCategory(r.category()); s.setPrice(r.price()); s.setQuantity(r.quantity());
    return repo.save(s);
  }

  public void delete(String id){ repo.deleteById(id); }

  public Sweet restock(String id, int quantity) {
      var sweet = repo.findById(id)
          .orElseThrow(() -> new NotFoundException("Sweet not found"));

      if (quantity <= 0) {
          throw new IllegalArgumentException("Quantity must be positive");
      }

      sweet.setQuantity(sweet.getQuantity() + quantity);
      return repo.save(sweet);
  }

  public Sweet purchase(String id, int quantity) {
      var sweet = repo.findById(id)
          .orElseThrow(() -> new NotFoundException("Sweet not found"));

      if (quantity <= 0) {
          throw new IllegalArgumentException("Quantity must be positive");
      }

      if (sweet.getQuantity() < quantity) {
          throw new IllegalStateException("Out of stock");
      }

      sweet.setQuantity(sweet.getQuantity() - quantity);
      return repo.save(sweet);
  }


}
