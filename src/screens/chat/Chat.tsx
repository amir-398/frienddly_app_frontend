import ROUTES from "@/constants/ROUTES";
import { getUserProfilImage } from "@/hooks/userData";
import { setChannel } from "@/redux/Slices/chatSlice";
import { useAppDispatch } from "@/redux/hooks";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ChannelList } from "stream-chat-expo";
import { chatUserId } from "../../../chatConfig";
export default function Chat({ navigation }) {
  const dispatch = useAppDispatch();
  const filters = {
    members: {
      $in: [chatUserId],
    },
  };

  const sort = {
    last_message_at: -1,
  };
  const getUserImage = async (id) => {
    try {
      const response = await getUserProfilImage(id);
      return response;
    } catch (error) {
      console.log("ee", error);
    }
  };
  const CustomListItem = (props) => {
    const { unread, channel, latestMessagePreview } = props;
    // Déterminer le nom du canal
    // Récupérer l'autre membre du canal (l'utilisateur actuel est exclu)
    const otherMember = Object.values(channel.state.members).find(
      (member) => member.user.id !== chatUserId
    );
    const userData = otherMember?.user;
    // Nom et image de l'autre utilisateur
    const userName = userData?.name;
    const userImage = getUserImage(userData?.id);
    console.log("userImage", userImage);

    const backgroundColor = unread ? "red" : "red";
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Image
          source={{ uri: userImage ? userImage : "" }}
          style={styles.channelImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.channelName}>{userName} </Text>
          <Text style={styles.latestMessage}>
            {latestMessagePreview
              ? latestMessagePreview.previews[0].text
              : "Vous n'avez pas de message"}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <ChannelList
      Preview={CustomListItem}
      filters={filters}
      sort={sort}
      onSelect={(channel) => {
        dispatch(setChannel(channel));
        navigation.navigate(ROUTES.ChatScreen);
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  channelImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  channelName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
  },
  latestMessage: {
    fontSize: 14,
    color: "#ccc",
  },
});
