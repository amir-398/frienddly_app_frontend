import { NotificationProps } from "@/enums/notification";
import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import ky from "ky";

// get All user notifications
export async function getAllNotification(): Promise<NotificationProps[]> {
  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }
  const endpoint = process.env.EXPO_PUBLIC_ENDPONT_HOME;
  try {
    const reponse = await ky(`${endpoint}/api/v1/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    }).json();
    return reponse as NotificationProps[];
  } catch (error) {
    const errorResponse = await error.response.json();
    throw new Error(errorResponse.message || "Something went wrong");
  }
}

export function useGetAllNotification() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getAllNotification,
  });
}