import COLORS from "@/constants/COLORS";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { StyleSheet } from "react-native";
import { MessageSimple, useMessageContext } from "stream-chat-expo";
export default function CustomMessageList(props) {
  const { message } = useMessageContext();
  const userId = useAppSelector((state) => state.authSlice.userData.id);
  const isCurrentUser = message.user.id === userId;

  const messageSimple = {
    content: {
      containerInner: {
        backgroundColor: COLORS.secondaryColor,
      },
    },
  };

  return <MessageSimple {...props} myMessageTheme={messageSimple} />;
}

const styles = StyleSheet.create({
  currentUserMessage: {
    backgroundColor: "#fff", // Couleur de fond pour vos messages
  },
  otherUserMessage: {
    backgroundColor: "#fff", // Couleur de fond pour les messages des autres utilisateurs
  },
  messageText: {
    color: "#fff", // Couleur du texte
  },
});
