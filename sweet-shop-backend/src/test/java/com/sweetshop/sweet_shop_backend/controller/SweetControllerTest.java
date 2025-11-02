package com.sweetshop.sweet_shop_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sweetshop.sweet_shop_backend.domain.Sweet;
import com.sweetshop.sweet_shop_backend.service.SweetService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest // ✅ Load full Spring context (fixes missing beans)
@AutoConfigureMockMvc // ✅ Auto-configures MockMvc for testing
class SweetControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SweetService sweetService; // ✅ Mock only this layer

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(username = "admin@sweetshop.com", roles = {"ADMIN"})
    void shouldPurchaseSweetSuccessfully() throws Exception {
        Sweet sweet = new Sweet("1", "Laddu", "Traditional", 25.0, 40);
        when(sweetService.purchase("1", 10)).thenReturn(sweet);

        mockMvc.perform(post("/api/sweets/1/purchase")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"quantity\":10}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.quantity").value(40));
    }

    @Test
    @WithMockUser(username = "admin@sweetshop.com", roles = {"ADMIN"})
    void shouldReturnBadRequestWhenOutOfStock() throws Exception {
        when(sweetService.purchase("1", 10)).thenThrow(new IllegalStateException("Out of stock"));

        mockMvc.perform(post("/api/sweets/1/purchase")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"quantity\":10}"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Out of stock"));
    }
}
