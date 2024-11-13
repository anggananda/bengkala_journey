import axios from "axios";

const baseUrl = "http://localhost:8080";

const golangService = axios.create({
  baseURL: baseUrl,
});

export const getHouse = async () => {
  try {
    const response = await golangService.get("/api/house/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
