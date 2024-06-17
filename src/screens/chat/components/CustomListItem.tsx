import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
import { useAppContext } from "@/context/AppProvider";
import { useAppSelector } from "@/redux/hooks";
import { useNavigation } from "@react-navigation/native";
import { DateTime, Settings } from "luxon";
import React, { useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
Settings.defaultLocale = "fr";
export default function CustomListItem(props: any) {
  const { unread, channel, latestMessagePreview } = props;
  const { setChannel } = useAppContext();
  const [isMessageUnread, setIsMessageUnread] = React.useState(unread);
  const navigation = useNavigation() as any;
  const userInfo = useAppSelector((state) => state.authSlice.userData);
  const userId = userInfo.id.toString();

  const otherMember: any = Object.values(channel.state.members).find(
    (member: any) => member.user.id !== userId
  );
  const userData = otherMember?.user;
  const userName = userData?.name;
  const userImage = userData?.image;

  useEffect(() => {
    if (unread) {
      setIsMessageUnread(true);
    } else {
      setIsMessageUnread(false);
    }
  }, [unread]);
  const backgroundColor = isMessageUnread ? COLORS.primaryColorLight : "#fff";
  let lastMessageText =
    latestMessagePreview?.text || "Vous n'avez pas de message";

  if (lastMessageText.length > 20) {
    lastMessageText = lastMessageText.slice(0, 20) + "...";
  }

  const isCurrentUserMessage = latestMessagePreview?.user?.id === userId;
  let displayMessage = lastMessageText;
  if (isCurrentUserMessage) {
    displayMessage = `Vous : ${lastMessageText}`;
  }

  const messageDateISO = latestMessagePreview?.created_at.toISOString();
  const messageDate = messageDateISO ? DateTime.fromISO(messageDateISO) : null;

  const now = DateTime.now();
  let displayTime;
  if (messageDate) {
    if (messageDate.hasSame(now, "day")) {
      displayTime = messageDate.toLocaleString(DateTime.TIME_SIMPLE);
    } else if (messageDate.plus({ days: 1 }).hasSame(now, "day")) {
      displayTime = `Hier, ${messageDate.toLocaleString(DateTime.TIME_SIMPLE)}`;
    } else if (messageDate.hasSame(now, "week")) {
      displayTime = messageDate.toFormat("ccc"); // Affiche le jour de la semaine (e.g., "Mer" pour mercredi)
    } else {
      displayTime = messageDate.toFormat("d MMM"); // Affiche le jour et le mois (e.g., "2 juin")
    }
  }

  return (
    <Pressable
      onPress={() => {
        setChannel(channel);
        setIsMessageUnread(false);
        navigation.navigate(ROUTES.ChatScreen);
      }}
      style={[styles.container, { backgroundColor }]}
    >
      {userImage && (
        <Image
          source={{ uri: userImage ? userImage : "" }}
          style={styles.channelImage}
        />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.channelName}>{userName}</Text>
        <View style={styles.latestMessageContainer}>
          <Text
            style={[
              styles.latestMessage,
              unread ? styles.unreadMessage : undefined,
            ]}
          >
            {displayMessage}
          </Text>
          <Text
            style={[
              styles.messageTime,
              unread ? styles.unreadMessage : undefined,
            ]}
          >
            {displayTime}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  channelImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 10,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    borderBottomColor: COLORS.primaryColor,
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  channelName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
  },
  latestMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  latestMessage: {
    fontSize: 14,
    color: "#ccc",
    fontFamily: FONTS.poppinsMedium,
  },
  messageTime: {
    fontSize: 14,
    color: "#ccc",
    marginLeft: 10,
    fontFamily: FONTS.poppinsMedium,
  },
  unreadMessage: {
    color: COLORS.primaryColor,
    fontFamily: FONTS.poppinsBold,
  },
});
