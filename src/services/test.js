export const getUser = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/users", {
      method: "GET",
    });
    if (!response.ok) return new Error("Failed to get Users");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
