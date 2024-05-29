import { useMutation } from "@tanstack/react-query";
import ky from "ky";

const endpoint = process.env.EXPO_PUBLIC_ENDPONT_HOME;
// Typage pour les informations de l'utilisateur
import * as SecureStore from "expo-secure-store";
const register = async (data: FormData) => {
  try {
    const response = await ky
      .post(`${endpoint}/api/v1/auth/register`, {
        body: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .json();
    return response;
  } catch (error) {
    const errorResponse = await error.response.json();
    throw new Error(errorResponse.message || "Something went wrong");
  }
};

const login = async (data: { email: string; password: string }) => {
  try {
    const response = await ky
      .post(`${endpoint}/api/v1/auth/login`, { json: data })
      .json();
    return response;
  } catch (error) {
    const errorResponse = await error.response.json();
    throw new Error(errorResponse.message || "Something went wrong");
  }
};
const verifyEmail = async (data: string) => {
  try {
    const response = await ky
      .post(`${endpoint}/api/v1/auth/verifyEmail`, {
        json: { email: data },
      })
      .json();
    return response;
  } catch (error) {
    const errorResponse = await error.response.json();
    throw new Error(errorResponse.message || "Something went wrong");
  }
};

export const verifyToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  try {
    const response: boolean = await ky(`${endpoint}/api/v1/auth/verifyToken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).json();
    return response;
  } catch (error) {
    return false;
  }
};
export function useRegister() {
  return useMutation({
    mutationKey: ["userRegister"],
    mutationFn: register,
  });
}

export function useLogin() {
  return useMutation({
    mutationKey: ["userLogin"],
    mutationFn: login,
  });
}
export function useVerifyEmail() {
  return useMutation({
    mutationKey: ["verifyEmail"],
    mutationFn: verifyEmail,
  });
}

3;
