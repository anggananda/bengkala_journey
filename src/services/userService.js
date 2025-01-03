import axios from "axios";
import { authStorage } from "../utils/encryptStorage";

const baseUrl = import.meta.env.VITE_BASE_URL_LOGIN;

const userService = axios.create({
  baseURL: baseUrl,
});

export const login = async (values) => {
  try {
    const response = await userService.post("/login", values);
    if (response.data && response.data.token) {
      authStorage.storeToken(response.data.token);
      authStorage.storeUsername(values.username)
      return response.data;
    } else {
      throw new Error("Token tidak ditemukan dalam response.");
    }
  } catch (error) {
    throw error;
  }
};
