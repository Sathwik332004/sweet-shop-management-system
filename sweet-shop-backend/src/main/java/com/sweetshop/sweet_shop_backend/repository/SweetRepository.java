package com.sweetshop.sweet_shop_backend.repository;

import com.sweetshop.sweet_shop_backend.domain.*;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface SweetRepository extends MongoRepository<Sweet, String> {
  List<Sweet> findByNameContainingIgnoreCase(String name);
  List<Sweet> findByCategoryIgnoreCase(String category);
  List<Sweet> findByPriceBetween(double min, double max);
}

