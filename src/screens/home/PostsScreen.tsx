import ScreenContainer from "@/components/ScreenContainer";
import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
import { useGetAllPosts } from "@/hooks/posts";
import { Icon } from "@rneui/base";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function PostsScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { categoryId, title } = route.params;
  const { data: postsData } = useGetAllPosts({ cat: categoryId });
  return (
    <SafeAreaView style={styles.container}>
      <ScreenContainer>
        <StatusBar backgroundColor="#fff" />
        <Text style={styles.screenTitle}>{title} </Text>
        <FlatList
          data={postsData}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              style={styles.postContainer}
              onPress={() =>
                navigation.navigate(ROUTES.PostScreen, { id: item.id })
              }
            >
              <Image
                source={{ uri: item.images[0].url }}
                style={styles.images}
              />
              <View style={styles.header}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.gradeContainer}>
                  <Icon name="star" type="ionicon" size={15} />
                  <Text style={styles.grade}>{item.grade} </Text>
                </View>
              </View>
              <Text style={styles.price}>{item.price} € par personne</Text>
              <Text style={styles.adress}> {item.location} </Text>
            </Pressable>
          )}
        />
      </ScreenContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenTitle: {
    fontFamily: FONTS.poppinsBold,
    fontSize: 20,
    textAlign: "center",
  },
  postContainer: {
    marginBottom: 30,
  },
  images: {
    height: 300,
    borderRadius: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.poppinsBold,
  },
  gradeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  grade: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 16,
    marginTop: 5,
    marginLeft: 5,
  },
  price: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 16,
  },
  adress: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 12,
    color: "#9e9e9e",
  },
});
