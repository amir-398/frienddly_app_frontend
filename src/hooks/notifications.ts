import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import ky from "ky";
interface Notification {
  id: number;
  userId: number;
  targetId: number;
  targetType: string;
  createdAt: Date;
  updatedAt: Date;
  friendship: {
    id: number;
    userId1: number;
    userId2: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    senderData: {
      id: number;
      firstname: string;
      lastname: string;
      profilImage: string;
      isAdmin: boolean;
    };
  };
}

// get All user notifications
export async function getAllNotification(): Promise<Notification[]> {
  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }
  const endpoint = process.env.EXPO_PUBLIC_ENDPONT_HOME;
  try {
    const reponse = await ky(`${endpoint}/api/v1/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    }).json();
    return reponse as Notification[];
  } catch (error) {
    const errorResponse = await error.response.json();
    console.log("error", errorResponse);

    throw new Error(errorResponse.message || "Something went wrong");
  }
}

export function useGetAllNotification() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getAllNotification,
  });
}
