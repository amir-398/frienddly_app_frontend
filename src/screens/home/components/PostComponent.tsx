import FONTS from "@/constants/FONTS";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

interface PostComponentProps {
  title: string;
  images: [
    {
      url: string;
      postId: number;
      id: number;
    }
  ];
}
export default function PostComponent({ title, images }: PostComponentProps) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: images[0].url,
        }}
      />
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.noteContainer}>
          <Text style={styles.note}>4;5</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.bottomText}>20-10 min</Text>
        <Text style={styles.bottomText}> 0.2mil </Text>
      </View>
    </View>
  );
}
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginTop: 10,
  },
  image: {
    width: width - 40,
    height: 200,
    borderRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
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
  bottom: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  bottomText: {
    fontSize: 11,
    fontFamily: FONTS.poppinsMedium,
    color: "grey",
    marginRight: 10,
  },
});
