import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import ky from "ky";

export async function getAllPosts(filter: { lgt: number; ltd: number }) {
  console.log("getAllPosts -> filter", filter);

  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await ky(
      `http://192.168.1.81:3333/api/v1/posts?lgt=${filter.lgt}&ltd=${filter.ltd}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ).json();
    return response;
  } catch (error) {
    const errorResponse = await error.response.json();
    throw new Error(errorResponse.message || "Something went wrong");
  }
}

export function useGetAllPosts(filter: { lgt: number; ltd: number }) {
  console.log("useGetAllPosts -> filter", filter);

  return useQuery({
    queryKey: ["posts", filter],
    queryFn: () => getAllPosts(filter),
    enabled: !!filter.lgt && !!filter.ltd,
  });
}
