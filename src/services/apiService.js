import axios from "axios";
import { authStorage } from "../utils/encryptStorage";

const baseUrl = import.meta.env.VITE_BASE_URL;

const apiService = axios.create({
  baseURL: baseUrl,
});

const noAuthEndpoints = ["/api/v1/register", "/api/v1/login"];

apiService.interceptors.request.use(
  async (config) => {
    try {
      const isNoAuthEndpoint = noAuthEndpoints.some((endpoint) =>
        config.url.includes(endpoint)
      );
      if (!isNoAuthEndpoint) {
        const token = await authStorage.retrieveToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      throw error;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Service for User
export const register = async (values) => {
  try {
    const response = await apiService.post("api/v1/register", values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const login = async (values) => {
  try {
    const response = await apiService.post("api/v1/login", values);
    if (response.data && response.data.token) {
      authStorage.storeToken(response.data.token);
      authStorage.storeUsername(values.username);
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await apiService.get("/api/v1/users/registered");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserByUsername = async (username) => {
  const formData = new FormData();
  formData.append("username", username);
  try {
    const response = await apiService.post("/api/v1/user", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await apiService.get(`api/v1/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editUserRegister = async (values, id) => {
  try {
    const response = await apiService.put(
      `/api/v1/users/registered/edit/${id}`,
      values
    );
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const editProfile = async (values, id) => {
  try {
    const response = await apiService.put(`/api/v1/users/edit/${id}`, values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await apiService.delete(`/api/v1/users/${id}`);
    return response.status;
  } catch (error) {
    throw error;
  }
};

// Service for News

export const getNews = async () => {
  try {
    const response = await apiService.get("api/v1/news");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNewsByID = async (id) => {
  try {
    const response = await apiService.get(`api/v1/news/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postNews = async (values) => {
  try {
    const response = await apiService.post("/api/v1/news/create", values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const deleteNews = async (id) => {
  try {
    const response = await apiService.delete(`/api/v1/news/${id}`);
    return response.status;
  } catch (error) {
    throw error;
  }
};

// Service for Message

export const postMessage = async (values) => {
  try {
    const response = await apiService.post("/api/v1/message", values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const getMessage = async () => {
  try {
    const response = await apiService.get("/api/v1/message");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Service for forums

export const getForums = async () => {
  try {
    const response = await apiService.get("/api/v1/viewforums");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Service Playlist
export const fetchPlaylists = async () => {
  try {
    const response = await apiService.get("/api/v1/playlists");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postPlaylist = async (values) => {
  try {
    const response = await apiService.post("/api/v1/palylists", values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const updatePlaylist = async (values, id) => {
  try {
    const response = await apiService.put(`/api/vi/playlists/${id}`, values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const deletePlaylist = async (id) => {
  try {
    const response = await apiService.delete(`/api/v1/playlists/${id}`);
    return response.status;
  } catch (error) {
    throw error;
  }
};
