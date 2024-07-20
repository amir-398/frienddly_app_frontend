import COLORS from "@/constants/COLORS";
import React from "react";
import { MessageSimple } from "stream-chat-expo";
export default function CustomMessageList(props: any) {
  const messageSimple = {
    content: {
      containerInner: {
        backgroundColor: COLORS.secondaryColor,
      },
    },
  };

  return <MessageSimple {...props} myMessageTheme={messageSimple} />;
}
