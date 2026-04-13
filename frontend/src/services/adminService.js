import api from "./api";

export const getAdminUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data.users;
};

export const updateAdminUserRole = async (id, rol) => {
  const response = await api.patch(`/admin/users/${id}/role`, {rol});
  return response.data.user;
};

export const updateAdminUserStatus = async (id, activo) => {
  const response = await api.patch(`/admin/users/${id}/status`, {activo});
  return response.data.user;
};

export const getActiveCarts = async () => {
  const response = await api.get("/admin/carts/active");
  return response.data.carts;
};

export const getCartDetailById = async (id) => {
  const response = await api.get(`/admin/carts/${id}`);
  return response.data.cart;
};

export const createAdminProduct = async (payload) => {
  const response = await api.post("/products", payload);
  return response.data.product;
};

export const getAdminProducts = async () => {
  const response = await api.get("/products");
  return response.data.products;
};

export const updateAdminProduct = async (id, payload) => {
  const response = await api.put(`/products/${id}`, payload);
  return response.data.product;
};

export const deleteAdminProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data.categories;
};
