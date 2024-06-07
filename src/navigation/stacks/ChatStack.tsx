import ROUTES from "@/constants/ROUTES";
import { useChatClient } from "@/hooks/useChatClient";
import HomeChat from "@/screens/chat/Chat";
import ChatScreen from "@/screens/chat/ChatScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider, Streami18n } from "stream-chat-expo";
import { chatApiKey } from "../../../chatConfig";

export default function ChatStack() {
  const Stack = createNativeStackNavigator();
  const chatClient = StreamChat.getInstance(chatApiKey);
  const CustomHeader = () => {
    return null;
  };

  const { clientIsReady } = useChatClient();

  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>;
  }
  const chatTheme = {
    channelPreview: {
      container: {
        backgroundColor: "transparent",
      },
    },
  };
  const streami18n = new Streami18n({ language: "fr" });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OverlayProvider value={{ style: chatTheme }} i18nInstance={streami18n}>
        <Chat client={chatClient}>
          <Stack.Navigator
            initialRouteName={ROUTES.Chat}
            screenOptions={{ header: CustomHeader }}
          >
            <Stack.Screen name={ROUTES.Chat} component={HomeChat} />
            <Stack.Screen name={ROUTES.ChatScreen} component={ChatScreen} />
          </Stack.Navigator>
        </Chat>
      </OverlayProvider>
    </GestureHandlerRootView>
  );
}
