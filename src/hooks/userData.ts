import { useMutation, useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import ky from "ky";

const endpoint = process.env.EXPO_PUBLIC_ENDPONT_WORK;

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
  } catch (error: any) {
    const errorResponse = await error.response.json();
    throw new Error(errorResponse.message || "Something went wrong");
  }
};

export const getProfilUser = async (userId: number) => {
  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const response = await ky(`${endpoint}/api/v1/user/profil/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).json();
    return response;
  } catch (error: any) {
    const errorResponse = await error.response.json();
    throw new Error(errorResponse.message || "Something went wrong");
  }
};

export const searchUsers = async (query: string) => {
  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const response = await ky
      .post(`${endpoint}/api/v1/user/search`, {
        json: { query },
        headers: { Authorization: `Bearer ${token}` },
      })
      .json();
    return response;
  } catch (error: any) {
    const errorResponse = await error.response.json();
    throw new Error(errorResponse.message || "Something went wrong");
  }
};

const updateUserData = async (data: any) => {
  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await ky
      .put(`${endpoint}/api/v1/user/update`, {
        body: data,
        headers: { Authorization: `Bearer ${token}` },
      })
      .json();
    return response;
  } catch (error: any) {
    const errorResponse = await error.response.json();
    throw new Error(errorResponse.message || "Something went wrong");
  }
};

const updatePassword = async (data: {
  newPassword: string;
  oldPassword: string;
}) => {
  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await ky
      .put(`${endpoint}/api/v1/user/updatePassword`, {
        json: data,
        headers: { Authorization: `Bearer ${token}` },
      })
      .json();
    return response;
  } catch (error: any) {
    console.log(error);

    const errorResponse = await error.response.json();
    throw new Error(errorResponse.message || "Something went wrong");
  }
};
const deleteUserData = async () => {
  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await ky
      .delete(`${endpoint}/api/v1/user/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .json();
    return response;
  } catch (error: any) {
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

export function useGetProfilUser(userId: number) {
  return useQuery({
    queryKey: ["profilUser", userId],
    queryFn: () => getProfilUser(userId),
  });
}

export function useSearchUsers() {
  return useMutation({
    mutationKey: ["searchUsers"],
    mutationFn: searchUsers,
  });
}

export function useUpdateUserData() {
  return useMutation({
    mutationKey: ["updateUserData"],
    mutationFn: updateUserData,
  });
}
export function useUpdatePassword() {
  return useMutation({
    mutationKey: ["updatePassword"],
    mutationFn: updatePassword,
  });
}
export function useDeleteUserData() {
  return useMutation({
    mutationKey: ["deleteUserData"],
    mutationFn: deleteUserData,
  });
}
