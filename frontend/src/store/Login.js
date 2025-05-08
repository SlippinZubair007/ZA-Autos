import { create } from "zustand";
import axios from "axios";

export const useLoginManager = create((set) => ({
  user: null,
  token: null,

  LoginUser: async ({ email, password_hash }) => {
    try {
      const response = await axios.post("/api/Login", {
        email,
        password_hash,
      });
      console.log('Response from API:', response.data); // Log the API response
      const { success, message, token, user } = response.data[0];

      if (success) {
        set({ user, token });
        // Optional: store token in localStorage/sessionStorage
        localStorage.setItem("token", token);
        return { success: true, message: "Login successful." };
      } else {
        return { success: false, message: message || "Login failed." };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Server error during login.",
      };
    }
  },

  LogoutUser: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token");
  },
}));
