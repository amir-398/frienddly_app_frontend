import ScreenContainer from "@/components/ScreenContainer";
import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useChatContext } from "stream-chat-expo";
import CommunityHeader from "./components/CommunityHeader";
import CustomListItem from "./components/CustomListItem";
import UsersFlatlist from "./components/UsersFlatlist";
export default function Community({ navigation }: { navigation: any }) {
  const userData = useAppSelector((state) => state.authSlice.userData);
  const userId = userData.id.toString();
  const dispatch = useAppDispatch();
  const { client } = useChatContext();

  const [channels, setChannels] = useState<any[]>([]);

  const filters = {
    type: "messaging",
    members: { $in: [userId] },
    channelType: "group",
  };

  const sort = {
    last_message_at: -1,
  };

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await client.queryChannels(filters, sort, {
          watch: true,
          state: true,
        });
        setChannels(response);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    fetchChannels();

    const handleEvent = () => {
      fetchChannels(); // Re-fetch channels to get the latest state
    };

    client.on("message.new", handleEvent);
    client.on("message.updated", handleEvent);
    client.on("message.deleted", handleEvent);
    client.on("channel.updated", handleEvent);
    client.on("channel.deleted", handleEvent);
    client.on("notification.message_new", handleEvent);

    return () => {
      client.off("message.new", handleEvent);
      client.off("message.updated", handleEvent);
      client.off("message.deleted", handleEvent);
      client.off("channel.updated", handleEvent);
      client.off("channel.deleted", handleEvent);
      client.off("notification.message_new", handleEvent);
    };
  }, []);

  return (
    <ScrollView>
      <ScreenContainer>
        <CommunityHeader />
        <Text style={styles.sugText}>Suggestion d'amis : </Text>
        <UsersFlatlist />
        <Text style={styles.sugText}>Groupe à thématiques : </Text>
        <FlatList
          data={channels}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CustomListItem
              channel={item}
              latestMessagePreview={
                item.state.messages[item.state.messages.length - 1]
              }
              unread={item.countUnread()}
              navigation={navigation}
              dispatch={dispatch}
              userId={userId}
            />
          )}
        />
      </ScreenContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sugText: {
    fontSize: 20,
    fontFamily: FONTS.poppinsBold,
    borderBottomColor: COLORS.primaryColor,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
