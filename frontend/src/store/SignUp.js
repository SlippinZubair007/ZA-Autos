import { create } from "zustand";

export const useUserManager= create((set) => ({
  users: [],
  setUser: (users) => set({ users }),
  CreateUser: async (newUser) => {
    if (!newUser.user_fname || !newUser.user_lname || !newUser.email || !newUser.password_hash || !newUser.contact_info || !newUser.dob || !newUser.address || !newUser.cnic) {
      return { success: false, message: "All fields are required" };
    }
    try {
      const res = await fetch("/api/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (res.ok) {
        set((state) => ({ users: [...state.users, data.data] }));
        return { success: true, message: "UserID created successfully" };
      } else {
        return { success: false, message: data.message || "Failed to create User" };
      } 
    } catch (error) {
      console.error("Error creating car:", error);
      return { success: false, message: "Failed to create User" };
    }
  },
}));
