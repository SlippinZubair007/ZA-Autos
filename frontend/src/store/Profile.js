import { create } from "zustand";

export const useProfileManager = create((set) => ({
  profile: {},
  setProfile: (profile) => set({ profile }),

  updateProfile: async (updatedData) => {
    const { user_id, user_fname, user_lname, email, password_hash, address, contact_info } = updatedData;

    if (!user_id || !user_fname || !user_lname || !email || !password_hash || !address || !contact_info) {
      return { success: false, message: "All fields are required." };
    }

    try {
      const res = await fetch("/api/UpdateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (res.ok) {
        set({ profile: data.updatedUser });
        return { success: true, message: "Profile updated successfully." };
      } else {
        return {
          success: false,
          message: data.message || "Failed to update profile.",
        };
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      return { success: false, message: "Server error occurred." };
    }
  },
}));
