package com.sweetshop.sweet_shop_backend.service;

import com.sweetshop.sweet_shop_backend.domain.Sweet;
import com.sweetshop.sweet_shop_backend.dto.SweetRequest;
import com.sweetshop.sweet_shop_backend.repository.SweetRepository;
import com.sweetshop.sweet_shop_backend.exception.NotFoundException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class SweetServiceTest {

    @Mock
    private SweetRepository repo;

    @InjectMocks
    private SweetService service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void create_shouldAddNewSweet() {
        SweetRequest req = new SweetRequest("Laddu", "Traditional", 25.0, 50);
        Sweet sweet = Sweet.builder()
                .name("Laddu")
                .category("Traditional")
                .price(25.0)
                .quantity(50)
                .build();

        when(repo.save(any(Sweet.class))).thenReturn(sweet);

        Sweet result = service.create(req);

        assertThat(result.getName()).isEqualTo("Laddu");
        verify(repo, times(1)).save(any(Sweet.class));
    }

    @Test
    void update_shouldThrowNotFound_whenSweetNotExist() {
        SweetRequest req = new SweetRequest("Barfi", "Milk", 30.0, 20);
        when(repo.findById("invalid-id")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.update("invalid-id", req))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("Sweet not found");
    }

    @Test
    void update_shouldUpdateExistingSweet() {
        Sweet old = Sweet.builder().id("1").name("Laddu").category("Traditional").price(25.0).quantity(50).build();
        SweetRequest req = new SweetRequest("Laddu", "Traditional", 30.0, 60);

        when(repo.findById("1")).thenReturn(Optional.of(old));
        when(repo.save(any(Sweet.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Sweet updated = service.update("1", req);

        assertThat(updated.getPrice()).isEqualTo(30.0);
        assertThat(updated.getQuantity()).isEqualTo(60);
    }

    @Test
    void restockShouldIncreaseQuantityWhenSweetExists() {
        // Arrange
        Sweet existing = new Sweet("1", "Laddu", "Traditional", 25.0, 50);
        when(repo.findById("1")).thenReturn(Optional.of(existing));
        when(repo.save(any(Sweet.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        Sweet updated = service.restock("1", 20);

        // Assert
        assertEquals(70, updated.getQuantity());
        verify(repo).save(existing);
    }

}
