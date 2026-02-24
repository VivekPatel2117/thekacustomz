import api from "./api";

export const createCollectionApi = async (payload) => {
  const { data } = await api.post("/collections", payload);
  return data;
};

export const getCollectionsApi = async () => {
  const { data } = await api.get("/collections");
  return data;
};

export const getCollectionByIdApi = async (id) => {
  const { data } = await api.get(`/collections/${id}`);
  return data;
};

export const getCollectionProductsApi = async (id) => {
  const { data } = await api.get(`/collections/get-collection-products/${id}`);
  return data;
};