import api from "./api";

export const createProductApi = async (payload) => {
  const { data } = await api.post("/products", payload);
  return data;
};
