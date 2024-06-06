import { setBottomBarIsVisible } from "@/redux/Slices/bottomBarIsVisible";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Channel, MessageList } from "stream-chat-expo";
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
  const myMessageTheme = {
    messageContainer: {
      backgroundColor: "red", // Couleur de fond pour vos messages
    },
    messageText: {
      color: "#000", // Couleur du texte de vos messages
    },
  };
  return (
    <Channel channel={channel} MessageSimple={CustomMessageList}>
      <MessageList />
      <CustomMessageInput />
    </Channel>
  );
}

const styles = StyleSheet.create({});
