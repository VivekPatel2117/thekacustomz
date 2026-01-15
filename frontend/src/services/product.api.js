import api from "./api";

export const createProductApi = async (payload) => {
  const { data } = await api.post("/products", payload);
  return data;
};

export const getProductsByTagsApi = async (tags) => {
  const { data } = await api.get(`/products/by-tags?tags=${tags}`);
  return data;
}