import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import ky from "ky";

const endpoint = process.env.EXPO_PUBLIC_ENDPONT_HOME;

export const getUserData = async () => {
  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const response = await ky(`${endpoint}/api/v1/user/getData`, {
      headers: { Authorization: `Bearer ${token}` },
    }).json();

    return response;
  } catch (error) {
    const errorResponse = await error.response.json();
    throw new Error(errorResponse.message || "Something went wrong");
  }
};

export function useGetUserData(enabled: boolean) {
  return useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
    enabled,
  });
}
