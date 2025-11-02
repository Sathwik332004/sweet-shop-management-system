package com.sweetshop.sweet_shop_backend.dto;

import jakarta.validation.constraints.Positive;

public record RestockRequest(@Positive int quantity) {}

