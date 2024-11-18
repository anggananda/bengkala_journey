import axios from "axios";

const baseUrl = import.meta.env.VITE_URL_UTS;

const utsService = axios.create({
  baseURL: baseUrl,
});

export const getPlaylist = async () => {
  try {
    const response = await utsService.get("/api/playlist/18");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postPlaylist = async (values) => {
  try {
    const respone = await utsService.post("/api/playlist/18", values);
    return respone.status;
  } catch (error) {
    throw error;
  }
};

export const updatePlaylist = async (id, values) => {
  try {
    const response = await utsService.post(`/api/playlist/update/${id}`, values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const deletePlaylist = async (id) => {
  try {
    const response = await utsService.delete(`/api/playlist/${id}`);
    return response.status;
  } catch (error) {
    throw error;
  }
};
