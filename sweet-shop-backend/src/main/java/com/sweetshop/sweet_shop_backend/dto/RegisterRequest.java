package com.sweetshop.sweet_shop_backend.dto;

import jakarta.validation.constraints.*;

public record RegisterRequest(
  @Email @NotBlank String email,
  @Size(min = 6) String password
) {}

