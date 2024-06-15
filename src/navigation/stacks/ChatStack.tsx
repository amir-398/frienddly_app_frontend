import ROUTES from "@/constants/ROUTES";
import { AppProvider } from "@/context/AppProvider";
import HomeChat from "@/screens/chat/Chat";
import ChatScreen from "@/screens/chat/ChatScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
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

  const chatTheme = {
    channelPreview: {
      container: {
        backgroundColor: "transparent",
      },
    },
  };
  const streami18n = new Streami18n({ language: "fr" });
  return (
    <AppProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <OverlayProvider value={{ style: chatTheme }}>
          <Chat client={chatClient} i18nInstance={streami18n}>
            <Stack.Navigator
              initialRouteName={ROUTES.Chat}
              screenOptions={{ header: CustomHeader }}
            >
              <Stack.Screen
                name={ROUTES.Chat}
                component={HomeChat}
                options={{
                  statusBarColor: "#fff",
                }}
              />
              <Stack.Screen
                name={ROUTES.ChatScreen}
                component={ChatScreen}
                options={{
                  statusBarColor: "#fff",
                }}
              />
            </Stack.Navigator>
          </Chat>
        </OverlayProvider>
      </GestureHandlerRootView>
    </AppProvider>
  );
}
