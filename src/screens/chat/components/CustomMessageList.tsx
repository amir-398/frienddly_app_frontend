import COLORS from "@/constants/COLORS";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { MessageSimple } from "stream-chat-expo";

const CustomMessage = (props) => {
  const { message } = props;
  const userId = useAppSelector((state) => state.authSlice.userData.id);
  const isCurrentUser = message.user.id === userId;
  const customStyles = {
    containerInner: isCurrentUser
      ? { backgroundColor: COLORS.primaryColor }
      : { backgroundColor: COLORS.secondaryColor },
    messageText: { color: "#000" },
  };
  return <MessageSimple {...props} />;
};

export default CustomMessage;
