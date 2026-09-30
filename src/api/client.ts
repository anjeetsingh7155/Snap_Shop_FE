import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const TOKEN_KEY = "snapshop_token";

export const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/v1`,
  timeout: 15000,
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const data = error.response.data as {
        message?: string;
        errors?: { message: string }[];
      };
      if (data?.errors?.length) {
        return data.errors.map((e) => e.message).join("\n");
      }
      return data?.message ?? "Something went wrong";
    }
    return "Cannot reach the server. Check your Wi-Fi and the API address.";
  }
  return "Something went wrong";
};
