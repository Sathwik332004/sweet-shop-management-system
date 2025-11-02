package com.sweetshop.sweet_shop_backend.dto;

import jakarta.validation.constraints.*;

public record LoginRequest(
  @Email @NotBlank String email,
  @NotBlank String password
) {}

