import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function PostRender() {
  const navigation = useNavigation();
  const fakeData = [
    {
      id: 1,
      title: "Post 1",
      category: "Restaurant",
      image:
        "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
    },
    {
      id: 2,
      title: "Post 2",
      category: "Restaurant",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLHl-acA8bMo8R2vF0arV19dWBkI9SnAa9lMeA6BL-mA&s",
    },
    {
      id: 3,
      title: "Post 3",
      category: "Restaurant",
      image:
        "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={fakeData}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            style={styles.postContainer}
            onPress={() => navigation.navigate(ROUTES.PostScreen)}
          >
            <ImageBackground
              style={styles.post}
              source={{ uri: item.image }}
              resizeMode="cover"
            >
              <LinearGradient
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                colors={["rgba(0,0,0,0.6)", "transparent"]}
                style={styles.postHeader}
              >
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.headerRight}>
                  <Icon name="star" type="ionicon" color="#fff" size={15} />
                  <Text style={styles.gradeTitle}>4.5</Text>
                </View>
              </LinearGradient>
              <Text style={styles.category}>{item.category}</Text>
            </ImageBackground>
          </Pressable>
        )}
      />
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
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontFamily: FONTS.poppinsBold,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  gradeTitle: {
    color: "#fff",
    lineHeight: 21.5,
    fontFamily: FONTS.poppinsBold,
    fontSize: 15,
    marginLeft: 3,
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
