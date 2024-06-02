import * as SecureStore from "expo-secure-store";
// chatConfig.js
export const chatApiKey = "2vuh5nt6mrwh";

async function getToken() {
  return await SecureStore.getItemAsync("token");
}

export const chatUserToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSJ9.JiQXdWk6l8m29O6YFhXwJcbXQyRVjh8sMo_F7nYwj8M";

export const chatUserId = "1";
export const chatUserName = "amir";
