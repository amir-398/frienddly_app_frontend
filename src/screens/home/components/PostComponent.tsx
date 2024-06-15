import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
import { S3ENDPOINTPOSTIMAGES } from "@/constants/S3Endpoint";
import { PostProps } from "@/enums/posts";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function PostComponent(item: PostProps) {
  const navigation = useNavigation() as any;
  const { images, title, grade, location } = item;

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate(ROUTES.PostScreen, { id: item.id })}
    >
      <Image
        style={styles.image}
        source={{
          uri: S3ENDPOINTPOSTIMAGES + images[0].url,
        }}
      />
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.noteContainer}>
          <Text style={styles.note}>{grade}</Text>
        </View>
      </View>
      <Text style={styles.bottomText}> {location}</Text>
    </Pressable>
  );
}
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginVertical: 10,
    width: width - 20,
  },
  image: {
    height: 200,
    borderRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
    marginTop: 5,
  },
  title: {
    fontSize: 16,
    marginTop: 2,
    fontFamily: FONTS.poppinsMedium,
  },
  noteContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEEEEE",
    borderRadius: 50,
    width: 25,
    height: 25,
  },
  note: {
    fontSize: 10,
    fontFamily: FONTS.poppinsMedium,
    marginTop: 3,
    lineHeight: 20,
  },

  bottomText: {
    fontSize: 11,
    fontFamily: FONTS.poppinsMedium,
    color: "grey",
    marginRight: 10,
    marginLeft: 2,
  },
});
