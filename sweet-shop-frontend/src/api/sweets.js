import api from "./axios";

export const getSweets = () => api.get("/sweets");
export const searchSweets = (params) => api.get("/sweets/search", { params });
export const createSweet = (payload) => api.post("/sweets", payload);
export const updateSweet = (id, payload) => api.put(`/sweets/${id}`, payload);
export const deleteSweet = (id) => api.delete(`/sweets/${id}`);
export const purchase = (id, quantity = 1) =>
  api.post(`/sweets/${id}/purchase`, { quantity });
export const restock = (id, quantity) =>
  api.post(`/sweets/${id}/restock`, { quantity });
