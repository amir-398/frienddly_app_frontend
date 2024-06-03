// useChatClient.js

import { useAppSelector } from "@/redux/hooks";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { chatApiKey } from "../../chatConfig";

const chatClient = StreamChat.getInstance(chatApiKey);

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);
  const userData = useAppSelector((state) => state.authSlice.userData);
  const userId = userData.id.toString();
  const name = userData.firstname + " " + userData.lastname;
  const user = {
    id: userId,
    name: name,
  };
  useEffect(() => {
    const setupClient = async () => {
      try {
        const streamToken = await SecureStore.getItemAsync("streamToken");
        chatClient.connectUser(user, streamToken);
        setClientIsReady(true);
        // connectUser is an async function. So you can choose to await for it or not depending on your use case (e.g. to show custom loading indicator)
        // But in case you need the chat to load from offline storage first then you should render chat components
        // immediately after calling `connectUser()`.
        // BUT ITS NECESSARY TO CALL connectUser FIRST IN ANY CASE.
      } catch (error) {
        if (error instanceof Error) {
          console.log(
            `An error occurred while connecting the user: ${error.message}`
          );
        }
      }
    };

    // If the chat client has a value in the field `userID`, a user is already connected
    // and we can skip trying to connect the user again.
    if (!chatClient.userID) {
      setupClient();
    }
  }, []);

  return {
    clientIsReady,
  };
};
