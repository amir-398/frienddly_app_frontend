import ROUTES from "@/constants/ROUTES";
import { AppProvider } from "@/context/AppProvider";
import Community from "@/screens/community/Community";
import CommunityChat from "@/screens/community/CommunityChat";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider, Streami18n } from "stream-chat-expo";
import { chatApiKey } from "../../../chatConfig";

export default function CommunityStack() {
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
              initialRouteName={ROUTES.Community}
              screenOptions={{ header: CustomHeader }}
            >
              <Stack.Screen name={ROUTES.Community} component={Community} />
              <Stack.Screen
                name={ROUTES.CommunityChat}
                component={CommunityChat}
              />
            </Stack.Navigator>
          </Chat>
        </OverlayProvider>
      </GestureHandlerRootView>
    </AppProvider>
  );
}
