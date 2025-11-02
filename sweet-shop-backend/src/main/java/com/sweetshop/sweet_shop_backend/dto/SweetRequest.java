package com.sweetshop.sweet_shop_backend.dto;

import jakarta.validation.constraints.*;

public record SweetRequest(
  @NotBlank String name,
  @NotBlank String category,
  @Positive double price,
  @PositiveOrZero int quantity
) {}

