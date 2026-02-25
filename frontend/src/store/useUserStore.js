import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUser, getProfile } from "../services/users.api";
import api from "../services/api";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,

      /* =========================
         LOGIN
      ========================= */
      login: async (credentials) => {
        try {
          set({ loading: true });

          // Step 1: Login
          const res = await loginUser(credentials);
          const token = res.data.token;

          // Save token
          localStorage.setItem("token", token);
          api.defaults.headers.common["Authorization"] =
            `Bearer ${token}`;

          // Step 2: Fetch Profile
          const profileRes = await getProfile();

          set({
            user: profileRes.data,
            token,
            loading: false,
          });

          return { success: true };

        } catch (error) {
          set({ loading: false });
          return {
            success: false,
            message:
              error.response?.data?.message ||
              "Login failed",
          };
        }
      },

      /* =========================
         LOGOUT
      ========================= */
      logout: () => {
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];

        set({
          user: null,
          token: null,
        });
      },

      /* =========================
         SET USER MANUALLY
      ========================= */
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-storage", // localStorage key
    }
  )
);