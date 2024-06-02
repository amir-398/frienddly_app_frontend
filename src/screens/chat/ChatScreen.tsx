import { setBottomBarIsVisible } from "@/redux/Slices/bottomBarIsVisible";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";

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
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
}

const styles = StyleSheet.create({});
