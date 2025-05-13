import { create } from "zustand";
export const useWishlistManager = create((set) => ({
  wishlist: [],
  setWishlist: (wishlist) => set({ wishlist }),
  createWishlistItem: async ({ user_id, car_id }) => {
    if (!user_id || !car_id ) {
      return { success: false, message: "User ID and Car ID are required." };
    }

    try {
      const response = await fetch("http://localhost:5000/api/CreateWish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, car_id }),
      });

      const data = await response.json();

      if (response.ok) {
        set((state) => ({
          wishlist: [...state.wishlist, data],
        }));
        return { success: true, message: "Car added to wishlist." };
      } else {
        return {
          success: false,
          message: data.message || "Failed to add to wishlist.",
        };
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      return {
        success: false,
        message: "Network error while adding to wishlist.",
      };
    }
  },
}));
