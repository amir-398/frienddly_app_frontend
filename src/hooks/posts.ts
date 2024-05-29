import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import ky from "ky";
const endpoint = process.env.EXPO_PUBLIC_ENDPONT_HOME;
interface Filter {
  lgt?: number;
  ltd?: number;
  cat?: number | string;
  nb?: 2;
}
export async function getAllPosts(filter: Filter) {
  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }
  const number = filter.nb ? filter.nb : "";
  const category = filter.cat ? filter.cat : "";
  const latitude = filter.ltd ? filter.ltd : "";
  const longitude = filter.lgt ? filter.lgt : "";
  try {
    const response = await ky(
      `${endpoint}/api/v1/posts?lgt=${longitude}&ltd=${latitude}&cat=${category}&nb=${number}`,
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

export function useGetAllPosts(filter: Filter) {
  return useQuery({
    queryKey: ["posts", filter],
    queryFn: () => getAllPosts(filter),
  });
}
