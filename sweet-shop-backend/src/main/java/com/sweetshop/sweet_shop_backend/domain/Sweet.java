package com.sweetshop.sweet_shop_backend.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
@Document(collection = "sweets")
public class Sweet {
  @Id private String id;
  private String name;
  private String category;
  private double price;
  private int quantity;
}

