import { create } from "zustand";
import { getUserById, getUserByUsername, login } from "../services/apiService";
import { authStorage } from "../utils/encryptStorage";
import useProfile from "./useProfile";

const useAuth = create((set) => ({
  auth: {
    id: null,
    username: null,
    token: null,
    login: false,
    role: null,
  },

  initAuth: async () => {
    try {
      const token = await authStorage.retrieveToken();
      const username = await authStorage.retrieveUsername();

      if (!token || !username) {
        throw { status: 401 }; // Lempar error 401 jika tidak valid
      }

      set((state) => ({
        auth: {
          ...state.auth,
          username,
          token,
          login: true,
        },
      }));

      const result = await getUserByUsername(username);
      const id = result.datas.ID;
      const role = result.datas.role;

      if (id) {
        const photo = await getUserById(id);
        const { updatePhotoProfile } = useProfile.getState();
        updatePhotoProfile(photo.datas.avatar_url);
      }

      set((state) => ({
        auth: {
          ...state.auth,
          id,
          role,
        },
      }));
    } catch (error) {
      if (error.status === 401) {
        return { status: 401 }; // Tambahkan informasi status
      }
      throw error;
    }
  },

  login: async (values) => {
    if (!values.username || !values.password) {
      throw new Error("Required username and password!");
    }
    try {
      const result = await login(values);
      const token = result.token;
      const id = result.id;
      const role = result.role;
      set((state) => ({
        auth: {
          ...state.auth,
          id,
          username: values.username,
          token,
          login: true,
          role,
        },
      }));
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      await authStorage.removeToken();
      await authStorage.removeUsername();
      set((state) => ({
        auth: {
          ...state.auth,
          id: null,
          username: null,
          token: null,
          login: false,
          role: null,
        },
      }));
    } catch (error) {
      throw error;
    }
  },
  updateUsername: (username) => {
    set((state) => ({
      auth: { ...state.auth, username: username },
    }));
  },
  updateRole: (role) => {
    set((state) => ({
      auth: {
        ...state.auth,
        role: role,
      },
    }));
  },

  updateUsername: (newUsername) =>
    set((state) => ({
      auth: {
        ...state.auth, // Salin properti auth lainnya
        username: newUsername, // Perbarui username
      },
    })),
}));

export default useAuth;
