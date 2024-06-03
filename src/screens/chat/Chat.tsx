import COLORS from "@/constants/COLORS";
import ROUTES from "@/constants/ROUTES";
import { getUserProfilImage } from "@/hooks/userData";
import { setChannel } from "@/redux/Slices/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ChannelList } from "stream-chat-expo";
export default function Chat({ navigation }: { navigation: any }) {
  const userData = useAppSelector((state) => state.authSlice.userData);
  const userId = userData.id.toString();
  const dispatch = useAppDispatch();
  const filters = {
    members: {
      $in: [userId],
    },
  };

  const sort = {
    last_message_at: -1,
  };

  const CustomListItem = (props) => {
    const { unread, channel, latestMessagePreview } = props;
    // Déterminer le nom du canal
    // Récupérer l'autre membre du canal (l'utilisateur actuel est exclu)
    const otherMember = Object.values(channel.state.members).find(
      (member) => member.user.id !== userId
    );
    const userData = otherMember?.user;
    const userName = userData?.name;
    const [userImage, setUserImage] = useState<string | undefined>("");
    console.log("la", latestMessagePreview);

    // Effet pour récupérer l'image utilisateur
    useEffect(() => {
      const fetchUserImage = async () => {
        if (userData?.id) {
          try {
            const response = await getUserProfilImage(userData.id);
            setUserImage(response);
          } catch (error) {
            console.log("Error fetching user image:", error);
          }
        }
      };

      fetchUserImage();
    }, [userData?.id]);
    const backgroundColor = unread ? COLORS.primaryColorLight : "#fff";
    return (
      <Pressable
        onPress={() => {
          dispatch(setChannel(channel));
          navigation.navigate(ROUTES.ChatScreen);
        }}
        style={[styles.container, { backgroundColor }]}
      >
        <Image
          source={{ uri: userImage ? userImage : "" }}
          style={styles.channelImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.channelName}>{userName} </Text>
          <Text style={styles.latestMessage}>
            {latestMessagePreview
              ? latestMessagePreview.previews[0].text == "Nothing yet..."
                ? "Vous n'avez pas de message"
                : latestMessagePreview.previews[0].text
              : "Vous n'avez pas de message"}
          </Text>
        </View>
      </Pressable>
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
    borderBottomColor: "red",
    borderBottomWidth: 1,
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
