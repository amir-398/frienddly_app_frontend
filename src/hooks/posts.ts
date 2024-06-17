import { PostProps } from "@/types/post";
import { PostsProps } from "@/types/posts";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import ky from "ky";
const endpoint = process.env.EXPO_PUBLIC_ENDPONT_WORK;
interface Filter {
  lgt?: number | string;
  ltd?: number | string;
  cat?: number | string;
  nb?: 2;
  q?: string;
}

export async function getAllPosts(filter: Filter): Promise<PostsProps[]> {
  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }
  const number = filter.nb ? filter.nb : "";
  const category = filter.cat ? filter.cat : "";
  const latitude = filter.ltd ? filter.ltd : "";
  const longitude = filter.lgt ? filter.lgt : "";
  const query = filter.q ? filter.q : "";
  try {
    const response = await ky(
      `${endpoint}/api/v1/posts?lgt=${longitude}&ltd=${latitude}&cat=${category}&nb=${number}&q=${query}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ).json();
    return response as PostsProps[];
  } catch (error: any) {
    const errorResponse = await error.response.json();
    throw new Error(errorResponse.message || "Something went wrong");
  }
}

// get post by id
export async function getPostById(id: number): Promise<PostProps> {
  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const response = await ky(`${endpoint}/api/v1/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).json();
    return response as PostProps;
  } catch (error: any) {
    const errorResponse = await error.response.json();
    throw new Error(errorResponse.message || "Something went wrong");
  }
}
// send Comment to post
async function sendCommentToPost(data: { postId: number; content: string }) {
  const { postId, content } = data;
  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const response = await ky
      .post(`${endpoint}/api/v1/posts/${postId}/addComment`, {
        json: { content },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json();
    return response;
  } catch (error: any) {
    const errorResponse = await error.response.json();
    throw new Error(errorResponse.message || "Something went wrong");
  }
}

// send grade to post
async function sendGradeToPost(data: { postId: number; grade: number }) {
  const { postId, grade } = data;
  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const response = await ky
      .post(`${endpoint}/api/v1/posts/${postId}/addGrade`, {
        json: { grade },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json();
    return response;
  } catch (error: any) {
    const errorResponse = await error.response.json();
    throw new Error(errorResponse.message || "Something went wrong");
  }
}

// use get all posts
export function useGetAllPosts(filter: Filter) {
  return useQuery({
    queryKey: ["posts", filter],
    queryFn: () => getAllPosts(filter),
  });
}

// use get post by id
export function useGetPostById(id: number) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
  });
}

// use send comment to post
export function useSendCommentToPost() {
  return useMutation({
    mutationKey: ["sendComment"],
    mutationFn: sendCommentToPost,
  });
}

// use send grade to post
export function useSendGradeToPost() {
  return useMutation({
    mutationKey: ["sendGrade"],
    mutationFn: sendGradeToPost,
  });
}
