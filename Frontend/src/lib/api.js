import { axiosInstance } from "./axios";

export const getAuthUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data; // Assuming the response data contains the authenticated user information
  } catch (error) {
    console.log("error in getAuthUser", error.message);
    return null;
  }
};

