import { create } from "zustand";
import axios from "axios";

export const useLoginManager = create((set) => ({
  user: null,
  token: null,
  user_id: null,

  LoginUser: async ({ email, password_hash }) => {
    try {
      const response = await axios.post("/api/Login", {
        email,
        password_hash,
      });

      console.log("Response from API:", response.data); 

      const { success, message, token, user, user_id } = response.data[0];

      if (success) {
        set({ user, token, user_id }); 
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", user_id); 

        return {
          success: true,
          message: message || "Login successful.",
          user_id,
        };
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
    set({ user: null, token: null, user_id: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
  },
}));
