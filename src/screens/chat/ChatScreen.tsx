import { setBottomBarIsVisible } from "@/redux/Slices/bottomBarIsVisible";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect } from "react";
import { Channel, MessageList } from "stream-chat-expo";
import CustomChannelHeader from "./components/CustomChannelHeader";
import CustomMessageInput from "./components/CustomMessageInput";
import CustomMessageList from "./components/CustomMessageList";
export default function ChatScreen() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setBottomBarIsVisible(false));
    return () => {
      dispatch(setBottomBarIsVisible(true));
    };
  }, []);
  const channel = useAppSelector((state) => state.chatSlice.channel);

  return (
    <Channel channel={channel} MessageSimple={CustomMessageList}>
      <CustomChannelHeader />
      <MessageList />
      <CustomMessageInput />
    </Channel>
  );
}
