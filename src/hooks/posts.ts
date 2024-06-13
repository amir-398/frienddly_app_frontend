import { useMutation, useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import ky from "ky";
const endpoint = process.env.EXPO_PUBLIC_ENDPONT_HOME;
interface Filter {
  lgt?: number | string;
  ltd?: number | string;
  cat?: number | string;
  nb?: 2;
  q?: string;
}
interface PostData {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  images: [
    {
      url: string;
      postId: number;
      id: number;
    }
  ];
  grade: number;
  grades: [
    {
      id: number;
      userId: number;
      postId: number;
      grade: number;
      createdAt: string;
      updatedAt: string;
      user: {
        firstname: string;
        lastname: string;
        profilImage: string;
        isAdmin: boolean;
      };
    }
  ];
  comments: [
    {
      id: number;
      userId: number;
      postId: number;
      content: string;
      createdAt: string;
      updatedAt: string;
      user: {
        firstname: string;
        lastname: string;
        profilImage: string;
        isAdmin: boolean;
      };
    }
  ];
}
interface Category {
  id: number;
  name: string;
}

interface Image {
  id: number;
  url: string;
  postId: number;
}

interface Post {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
  category: Category;
  images: Image[];
  price: number;
  location: string;
  grade: number;
}

export async function getAllPosts(filter: Filter): Promise<Post[]> {
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
    return response as Post[];
  } catch (error) {
    const errorResponse = await error.response.json();
    throw new Error(errorResponse.message || "Something went wrong");
  }
}

// get post by id
export async function getPostById(id: number): Promise<PostData> {
  const token = await SecureStore.getItemAsync("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const response = await ky(`${endpoint}/api/v1/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).json();
    return response as PostData;
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
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
