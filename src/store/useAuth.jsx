import { create } from "zustand";
import { login } from "../services/userService";

const useAuth = create((set) => ({
  auth: {
    username: null,
    token: null,
    login: false,
  },
  login: async (values) => {
    try {
      const token = await login(values);
      set((state) => ({
        auth: {
          ...state.auth,
          username: values.username,
          token: token,
          login: true,
        },
      }));
    } catch (error) {
      throw error;
    }
  },
  //   set((state) => ({
  //     auth: { ...state.auth, username: values.username, login: true },
  //   })),
  logout: () =>
    set((state) => ({
      auth: { ...state.auth, login: false },
    })),
}));

export default useAuth;
