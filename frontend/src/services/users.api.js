import api from "./api";

// Register
export const registerUser = (data) =>
  api.post("/users/register", data);

// Login
export const loginUser = (data) =>
  api.post("/users/login", data);

// Get Profile
export const getProfile = () =>
  api.get("/users/profile");

// Update Profile
export const updateProfile = (data) =>
  api.put("/users/profile", data);