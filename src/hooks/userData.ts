import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import ky from "ky";
export const getUserData = async () => {
  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const response = await ky("http://192.168.1.81:3333/api/v1/user/getData", {
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
