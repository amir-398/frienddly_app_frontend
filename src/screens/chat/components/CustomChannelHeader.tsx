import InteractiveIcon from "@/components/InteractiveIcon";
import FONTS from "@/constants/FONTS";
import { useAppSelector } from "@/redux/hooks";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useChannelContext } from "stream-chat-expo";

export default function CustomChannelHeader() {
  const navigation = useNavigation();
  const { channel } = useChannelContext();
  const userId = useAppSelector((state) => state.authSlice.userData.id);

  // Filtrez le membre du canal qui n'est pas l'utilisateur actuel
  const otherMember = Object.values(channel.state.members).find(
    (member) => member.user && member.user.id !== userId.toString()
  );

  if (!otherMember) {
    return null;
  }

  const userData = otherMember?.user;

  const username = userData?.name;

  const userImage = userData?.image;

  return (
    <View style={styles.headerContainer}>
      <InteractiveIcon
        name="arrow-back"
        type="ionicon"
        color="#000"
        onPress={() => navigation.goBack()}
      />
      {userImage && (
        <Image source={{ uri: userImage }} style={styles.profileImage} />
      )}
      <View>
        <Text style={styles.profileName}>{username}</Text>
        <View style={styles.onlineStatusContainer}>
          <View
            style={[
              styles.statusCircle,
              { backgroundColor: userData.online ? "#4caf50" : "red" },
            ]}
          ></View>
          <Text style={styles.onlineStatusText}>
            {userData.online ? "En ligne" : "Hors ligne"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  onlineStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusCircle: {
    width: 8,
    height: 8,
    borderRadius: 50,
    marginRight: 5,
  },
  onlineStatusText: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 12,
    marginTop: 2,
  },
});
