import axios from "axios";
import { authStorage } from "../utils/encryptStorage";

const baseUrl = import.meta.env.VITE_BASE_URL;

const apiService = axios.create({
  baseURL: baseUrl,
});

const noAuthEndpoints = [
  "/api/v1/register",
  "/api/v1/login",
  "/api/v1/testimonials",
];

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

export const updateNews = async (values, id) => {
  try {
    const response = await apiService.put(`/api/v1/news/update/${id}`, values);
    return response.status;
  } catch (error) {
    console.log(error);
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
    const response = await apiService.get("/api/v1/forums");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postForum = async (values) => {
  try {
    const response = await apiService.post("/api/v1/forums", values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const updateForum = async (values, id) => {
  try {
    const response = await apiService.put(`/api/v1/forum/${id}`, values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const deleteForum = async (id) => {
  try {
    const response = await apiService.delete(`/api/v1/forum/${id}`);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const getForumByID = async (id) => {
  try {
    const response = await apiService.get(`/api/v1/forums/${id}`);
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
    const response = await apiService.post("/api/v1/playlists", values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const updatePlaylist = async (values, id) => {
  try {
    const response = await apiService.put(`/api/v1/playlist/${id}`, values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const deletePlaylist = async (id) => {
  try {
    const response = await apiService.delete(`/api/v1/playlist/${id}`);
    return response.status;
  } catch (error) {
    throw error;
  }
};

// Service Reply

export const getAllReply = async () => {
  try {
    const response = await apiService.get("/api/v1/reply");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReply = async (id) => {
  try {
    const response = await apiService.get(`/api/v1/reply/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postReply = async (values) => {
  try {
    const response = await apiService.post("/api/v1/reply", values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const updateReply = async (values, id) => {
  try {
    const response = await apiService.put(`/api/v1/reply/${id}`, values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const deleteReply = async (id) => {
  try {
    const response = await apiService.delete(`/api/v1/reply/${id}`);
    return response.status;
  } catch (error) {
    throw error;
  }
};

// Contribute
export const getContribute = async () => {
  try {
    const response = await apiService.get("/api/v1/contribute");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Tenun
export const getTenun = async () => {
  try {
    const response = await apiService.get("/api/v1/tenun");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postTenun = async (values) => {
  try {
    const response = await apiService.post("/api/v1/tenun", values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const updateTenun = async (values, id) => {
  try {
    const response = await apiService.put(`/api/v1/tenun/${id}`, values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const deleteTenun = async (id) => {
  try {
    const response = await apiService.delete(`/api/v1/tenun/${id}`);
    return response.status;
  } catch (error) {
    throw error;
  }
};

// Like
export const getLike = async () => {
  try {
    const response = await apiService.get("/api/v1/like");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postLike = async (values) => {
  try {
    const response = await apiService.post("/api/v1/like", values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const deleteLike = async (id) => {
  try {
    const response = await apiService.delete(`/api/v1/like/${id}`);
    return response.status;
  } catch (error) {
    throw error;
  }
};

// content
export const getContent = async () => {
  try {
    const response = await apiService.get("/api/v1/content");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postContent = async (values) => {
  try {
    const response = await apiService.post("/api/v1/content", values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const updateContent = async (values, id) => {
  try {
    const response = await apiService.put(
      `/api/v1/content/update/${id}`,
      values
    );
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const deleteContent = async (id) => {
  try {
    const response = await apiService.delete(`/api/v1/content/${id}`);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const getTestimonials = async () => {
  try {
    const response = await apiService.get("/api/v1/testimonials");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const downloadContent = async (filename) => {
  try {
    const response = await apiService.get(
      `/api/v1/content/download/${filename}`,
      {
        responseType: "blob", // <- penting agar dapat file dalam format biner
      }
    );

    // Buat URL untuk blob
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Buat elemen <a> untuk trigger download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename); // nama file saat diunduh
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Bersihkan URL blob
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
    throw error;
  }
};
