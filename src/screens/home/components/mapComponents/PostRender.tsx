import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
interface Post {
  post: {
    id: number;
    title: string;
    description: string;
    images: {
      url: string;
    }[];
    category: {
      id: number;
      name: string;
    };
  };
}
export default function PostRender(post: Post) {
  const navigation = useNavigation();
  const data = post.post;
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.postContainer}
        onPress={() => navigation.navigate(ROUTES.PostScreen as never)}
      >
        <ImageBackground
          style={styles.post}
          source={{
            uri: data?.images[0]?.url,
          }}
          resizeMode="cover"
        >
          <LinearGradient
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            colors={["rgba(0,0,0,0.6)", "transparent"]}
          >
            <Text style={styles.title}>{data?.title}</Text>
          </LinearGradient>
          <View style={styles.noteContainer}>
            <Icon
              name="star"
              type="ionicon"
              color={COLORS.secondaryColor}
              size={25}
            />
            <Text style={styles.gradeTitle}>4.5</Text>
          </View>
          <Text style={styles.category}>{data?.category?.name}</Text>
        </ImageBackground>
      </Pressable>
    </View>
  );
}
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    height: 150,
    borderRadius: 25,
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    overflow: "hidden",
  },
  postContainer: {
    width: width * 0.8,
  },
  post: {
    justifyContent: "space-between",
    paddingBottom: 10,
    height: 150,
  },

  title: {
    fontSize: 20,
    color: "#fff",
    fontFamily: FONTS.poppinsBold,
    textAlign: "center",
    paddingTop: 10,
  },
  noteContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  gradeTitle: {
    color: "#fff",
    fontFamily: FONTS.poppinsBold,
    fontSize: 23,
    marginLeft: 3,
    marginTop: 5,
  },
  category: {
    backgroundColor: COLORS.secondaryColor,
    color: "#fff",
    padding: 5,
    width: 100,
    textAlign: "center",
    fontFamily: FONTS.poppinsBold,
    borderRadius: 10,
    fontSize: 12,
    alignSelf: "flex-end",
    marginRight: 10,
  },
});
