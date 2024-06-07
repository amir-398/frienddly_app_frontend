import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import ky from "ky";

// accept friend request notifications
export async function acceptFriendRequestNotification(
  friendshipId: number
): Promise<void> {
  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }
  const endpoint = process.env.EXPO_PUBLIC_ENDPONT_HOME;
  try {
    await ky
      .put(`${endpoint}/api/v1/friends/acceptInvitation/${friendshipId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .json();
  } catch (error) {
    const errorResponse = await error.response.json();
    console.log("error", errorResponse);

    throw new Error(errorResponse.message || "Something went wrong");
  }
}

// refuse friend request notifications
export async function refuseFriendRequestNotification(
  friendshipId: number
): Promise<void> {
  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }
  const endpoint = process.env.EXPO_PUBLIC_ENDPONT_HOME;
  try {
    await ky
      .put(`${endpoint}/api/v1/friends/refuseInvitation/${friendshipId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .json();
  } catch (error) {
    const errorResponse = await error.response.json();
    console.log("error", errorResponse);

    throw new Error(errorResponse.message || "Something went wrong");
  }
}

// use accept friend request notifications
export function useAcceptFriendRequestNotification() {
  return useMutation({
    mutationKey: ["acceptFriendRequestNotification"],
    mutationFn: acceptFriendRequestNotification,
  });
}

// use refuse friend request notifications
export function useRefuseFriendRequestNotification() {
  return useMutation({
    mutationKey: ["refuseFriendRequestNotification"],
    mutationFn: refuseFriendRequestNotification,
  });
}
