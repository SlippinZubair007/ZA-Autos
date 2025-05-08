import { create } from "zustand";

export const useCarStore = create((set) => ({
  cars: [],
  setCars: (cars) => set({ cars }),
  createCar: async (newCar) => {
    if (!newCar.model || !newCar.price) {
      return { success: false, message: "All fields are required" };
    }
    try {
      const res = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar),
      });

      const data = await res.json();

      if (res.ok) {
        set((state) => ({ cars: [...state.cars, data.data] }));
        return { success: true, message: "Car created successfully" };
      } else {
        return { success: false, message: data.message || "Failed to create car" };
      }
    } catch (error) {
      console.error("Error creating car:", error);
      return { success: false, message: "Failed to create car" };
    }
  },
}));
