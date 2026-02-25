import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      totalAmount: 0,
      discountAmount: 0,
      coupon: null,
      orderNote: "",

      /* =========================
         ADD TO CART
      ========================= */
      addToCart: (product) => {
        const cart = get().cart;

        const cartItemId = `${product.id}-${product.size || ""}-${
          product.color || ""
        }-${product.customImage || ""}`;

        const existingItem = cart.find(
          (item) => item.cartItemId === cartItemId
        );

        let updatedCart;

        if (existingItem) {
          updatedCart = cart.map((item) =>
            item.cartItemId === cartItemId
              ? {
                  ...item,
                  quantity: item.quantity + product.quantity,
                }
              : item
          );
        } else {
          updatedCart = [
            ...cart,
            {
              ...product,
              cartItemId,
            },
          ];
        }

        set({ cart: updatedCart });
        get().calculateTotal();
      },

      /* =========================
         REMOVE ITEM
      ========================= */
      removeFromCart: (cartItemId) => {
        const updatedCart = get().cart.filter(
          (item) => item.cartItemId !== cartItemId
        );

        set({ cart: updatedCart });
        get().calculateTotal();
      },

      /* =========================
         UPDATE QUANTITY
      ========================= */
      updateQuantity: (cartItemId, quantity) => {
        const updatedCart = get().cart.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity }
            : item
        );

        set({ cart: updatedCart });
        get().calculateTotal();
      },

      /* =========================
         CLEAR CART
      ========================= */
      clearCart: () =>
        set({
          cart: [],
          totalAmount: 0,
          discountAmount: 0,
          coupon: null,
          orderNote: "",
        }),

      /* =========================
         SET ORDER NOTE
      ========================= */
      setOrderNote: (note) =>
        set({
          orderNote: note,
        }),

      /* =========================
         APPLY COUPON (Simple Example)
      ========================= */
      applyCoupon: (code) => {
        let discount = 0;

        if (code === "THEKA10") {
          discount = get().totalAmount * 0.1;
        }

        set({
          coupon: code,
          discountAmount: discount,
        });
      },

      /* =========================
         CALCULATE TOTAL
      ========================= */
      calculateTotal: () => {
        const total = get().cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        set({ totalAmount: total });
      },
    }),
    {
      name: "thekacustomz-cart",
      onRehydrateStorage: () => (state) => {
        // Recalculate total after reload
        state?.calculateTotal();
      },
    }
  )
);