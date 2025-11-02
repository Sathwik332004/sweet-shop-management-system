package com.sweetshop.sweet_shop_backend.dto;


import jakarta.validation.constraints.Positive;

public record PurchaseRequest(@Positive int quantity) {}

