import InteractiveIcon from "@/components/InteractiveIcon";
import FONTS from "@/constants/FONTS";
import { S3ENDPOINT } from "@/constants/S3Endpoint";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function CommunityChannelHeader({
  channelName,
  channelImage,
}: {
  channelName: string;
  channelImage: string;
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <InteractiveIcon
        name="arrow-back"
        type="ionicon"
        color="#000"
        onPress={() => navigation.goBack()}
      />
      {channelImage && (
        <Image
          source={{ uri: S3ENDPOINT + channelImage }}
          style={styles.profileImage}
        />
      )}
      <View>
        <Text style={styles.profileName}>{channelName}</Text>
        <View style={styles.onlineStatusContainer}></View>
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
