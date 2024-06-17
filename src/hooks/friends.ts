import { useMutation, useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import ky from "ky";
const endpoint = process.env.EXPO_PUBLIC_ENDPONT_WORK;

// accept friend request notifications
async function acceptFriendRequestNotification(
  friendshipId: number
): Promise<void> {
  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }

  try {
    await ky
      .put(`${endpoint}/api/v1/friends/acceptInvitation/${friendshipId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .json();
  } catch (error: any) {
    const errorResponse = await error.response.json();
    throw new Error(errorResponse.message || "Something went wrong");
  }
}

// refuse friend request notifications
async function refuseFriendRequestNotification(
  friendshipId: number
): Promise<void> {
  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }

  try {
    await ky
      .put(`${endpoint}/api/v1/friends/rejectInvitation/${friendshipId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .json();
  } catch (error: any) {
    const errorResponse = await error.response.json();
    throw new Error(errorResponse.message || "Something went wrong");
  }
}

// friends suggestion
async function friendsSuggestion(): Promise<any> {
  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const reponse = await ky(`${endpoint}/api/v1/friends/suggestion`, {
      headers: { Authorization: `Bearer ${token}` },
    }).json();
    return reponse;
  } catch (error: any) {
    const errorResponse = await error.response.json();
    throw new Error(errorResponse.message || "Something went wrong");
  }
}

async function sendFriendRequest(userId: number): Promise<void> {
  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    await ky
      .post(`${endpoint}/api/v1/friends/sendInvitation/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .json();
  } catch (error: any) {
    const errorResponse = await error.response.json();
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

// use friends suggestion
export function useFriendsSuggestion() {
  return useQuery({
    queryKey: ["friendsSuggestion"],
    queryFn: friendsSuggestion,
  });
}

// use send friend request
export function useSendFriendRequest() {
  return useMutation({
    mutationKey: ["sendFriendRequest"],
    mutationFn: sendFriendRequest,
  });
}
