import { create } from "zustand";

export const useRatingManager = create((set) => ({
  ratings: [],
  setRating: (ratings) => set({ ratings }),
  
  CreateRating: async (newRating) => {
    const { review_text, user_id, car_id, rating } = newRating;

    if (!review_text || !user_id || !car_id || !rating) {
      return { success: false, message: "All fields are required." };
    }

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRating),
      });

      const data = await res.json();

      if (res.ok) {
        set((state) => ({
          ratings: [...state.ratings, data.data], 
        }));
        return { success: true, message: "Rating created successfully." };
      } else {
        return {
          success: false,
          message: data.message || "Failed to create rating.",
        };
      }
    } catch (error) {
      console.error("Error creating rating:", error);
      return { success: false, message: "Server error occurred." };
    }
  },
}));
