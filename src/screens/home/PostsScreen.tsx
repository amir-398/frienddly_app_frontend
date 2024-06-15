import InteractiveIcon from "@/components/InteractiveIcon";
import ScreenContainer from "@/components/ScreenContainer";
import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
import { S3ENDPOINTPOSTIMAGES } from "@/constants/S3Endpoint";
import { useGetAllPosts } from "@/hooks/posts";
import { setBottomBarIsVisible } from "@/redux/Slices/bottomBarIsVisible";
import { useAppDispatch } from "@/redux/hooks";
import { Icon } from "@rneui/base";
import React, { useEffect } from "react";
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
  const dispatch = useAppDispatch();
  const { categoryId, title, q, ltd, lgt } = route.params;
  const { data: postsData } = useGetAllPosts({
    cat: categoryId,
    q,
    ltd,
    lgt,
  });

  // hide bottom bar on first render
  useEffect(() => {
    dispatch(setBottomBarIsVisible(false));
    return () => {
      dispatch(setBottomBarIsVisible(true));
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScreenContainer>
        <StatusBar backgroundColor="#fff" />
        <View style={styles.screenHeader}>
          <View style={styles.iconContainer}>
            <InteractiveIcon
              name="arrow-back"
              type="ionicon"
              color="#000"
              padding={5}
              onPress={() => navigation.goBack()}
            />
          </View>
          <Text style={styles.screenTitle}>{title} </Text>
        </View>
        {postsData && postsData?.length > 0 ? (
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
                  source={{ uri: S3ENDPOINTPOSTIMAGES + item.images[0].url }}
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
        ) : (
          <Text style={styles.noneText}>Aucun résultat pour le moment</Text>
        )}
      </ScreenContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  screenHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: "100%",
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    left: 0,
  },
  screenTitle: {
    fontFamily: FONTS.poppinsBold,
    fontSize: 20,
    alignSelf: "center",
  },
  postContainer: {
    marginBottom: 20,
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
  noneText: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 16,
    color: "#9e9e9e",
    textAlign: "center",
  },
});
