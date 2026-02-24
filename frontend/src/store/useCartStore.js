import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      totalAmount: 0,

      addToCart: (product) => {
        const cart = get().cart;

        // Unique cart item key (important for custom products)
        const cartItemId = `${product.id}-${product.size || ""}-${product.color || ""}-${product.customImage || ""}`;

        const existingItem = cart.find(
          (item) => item.cartItemId === cartItemId
        );

        if (existingItem) {
          const updatedCart = cart.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          );

          set({ cart: updatedCart });
        } else {
          set({
            cart: [
              ...cart,
              {
                ...product,
                cartItemId,
              },
            ],
          });
        }

        get().calculateTotal();
      },

      removeFromCart: (cartItemId) => {
        set({
          cart: get().cart.filter(
            (item) => item.cartItemId !== cartItemId
          ),
        });

        get().calculateTotal();
      },

      updateQuantity: (cartItemId, quantity) => {
        const updatedCart = get().cart.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity }
            : item
        );

        set({ cart: updatedCart });
        get().calculateTotal();
      },

      clearCart: () => set({ cart: [], totalAmount: 0 }),

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
    }
  )
);