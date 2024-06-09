import { useAppContext } from "@/context/AppProvider";
import { setBottomBarIsVisible } from "@/redux/Slices/bottomBarIsVisible";
import { useAppDispatch } from "@/redux/hooks";
import CustomMessageInput from "@/screens/chat/components/CustomMessageInput";
import React, { useEffect } from "react";
import { Channel, MessageList } from "stream-chat-expo";
import CustomChannelHeader from "./components/CustomChannelHeader";
export default function CommunityChat({ route }: { route: any }) {
  const { channelName, channelImage } = route.params;

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
      <CustomChannelHeader
        channelName={channelName}
        channelImage={channelImage}
      />
      <MessageList />
      <CustomMessageInput />
    </Channel>
  );
}
