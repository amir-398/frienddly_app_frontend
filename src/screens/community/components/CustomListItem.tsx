import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
import { useAppContext } from "@/context/AppProvider";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

export default function CustomListItem(props: any) {
  const { channel } = props;
  const { setChannel } = useAppContext();
  const navigation = useNavigation();

  // get channel name
  const channelName: string = channel.data.name;
  const channelImage: string = channel.data.image;

  return (
    <Pressable
      onPress={() => {
        setChannel(channel);
        navigation.navigate(ROUTES.CommunityChat, {
          channelName: channelName,
          channelImage: channelImage,
        });
      }}
      style={styles.container}
    >
      {channelImage && (
        <ImageBackground
          source={{ uri: channelImage }}
          style={styles.channelImage}
        >
          <Text style={styles.channelText}>{channelName}</Text>
        </ImageBackground>
      )}
    </Pressable>
  );
}
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    borderRadius: 20,
    overflow: "hidden",
  },
  channelImage: {
    width: width,
    height: 120,
    borderRadius: 20,
  },
  channelText: {
    color: "white",
    fontSize: 20,
    fontFamily: FONTS.poppinsBold,
    padding: 10,
  },
});
