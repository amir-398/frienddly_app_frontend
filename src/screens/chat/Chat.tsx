import messageRight1 from "@/assets/icons/message_right_icon_1.png";
import messageRight2 from "@/assets/icons/messages_right_icon_2.png";
import messageLeft from "@/assets/icons/messges_left_icon.png";
import ScreenContainer from "@/components/ScreenContainer";
import FONTS from "@/constants/FONTS";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChatContext } from "stream-chat-expo";
import CustomListItem from "./components/CustomListItem";
export default function Chat({ navigation }: { navigation: any }) {
  const userData = useAppSelector((state) => state.authSlice.userData);
  const userId = userData.id.toString();
  const dispatch = useAppDispatch();
  const { client } = useChatContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [channels, setChannels] = useState<any[]>([]);

  const filters = {
    members: {
      $in: [userId],
    },
    channelType: "private",
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
  }, [searchQuery]);

  const filteredChannels = channels.filter((channel) => {
    const memberNames = Object.values(channel.state.members)
      .filter((member: any) => member.user.id !== userId)
      .map((member: any) => member.user.name.toLowerCase());

    return memberNames.some((name) => name.includes(searchQuery.toLowerCase()));
  });

  return (
    <SafeAreaView>
      <ScreenContainer>
        <View style={styles.header}>
          <Image source={messageLeft} style={styles.headerIcon} />
          <View style={styles.headerRight}>
            <Image source={messageRight1} style={styles.headerIcon} />
            <Image source={messageRight2} style={styles.headerIcon} />
          </View>
        </View>
        <Text style={styles.title}>Discussions</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Rechercher par nom ou prénom"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </ScreenContainer>
      {filteredChannels.length > 0 ? (
        <FlatList
          data={filteredChannels}
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
      ) : (
        <Text style={styles.noneChatText}>
          Vous n'avez aucune discussion pour le moment
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
    marginRight: 10,
  },
  headerIcon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.poppinsBold,
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  noneChatText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: FONTS.poppinsMedium,
    marginTop: 20,
  },
});
