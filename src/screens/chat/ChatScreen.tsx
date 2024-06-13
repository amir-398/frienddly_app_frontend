import { useAppContext } from "@/context/AppProvider";
import { setBottomBarIsVisible } from "@/redux/Slices/bottomBarIsVisible";
import { useAppDispatch } from "@/redux/hooks";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Channel, MessageList } from "stream-chat-expo";
import CustomChannelHeader from "./components/CustomChannelHeader";
import CustomMessageInput from "./components/CustomMessageInput";
export default function ChatScreen() {
  const { channel } = useAppContext();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setBottomBarIsVisible(false));
    return () => {
      dispatch(setBottomBarIsVisible(true));
    };
  }, []);
  // const channel = useAppSelector((state) => state.chatSlice.channel);

  return (
    <Channel channel={channel}>
      <SafeAreaView style={{ flex: 1 }}>
        <CustomChannelHeader />
        <MessageList />
        <CustomMessageInput />
      </SafeAreaView>
    </Channel>
  );
}
