import ScreenContainer from "@/components/ScreenContainer";
import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
import { PostProps } from "@/enums/posts";
import { useGetCategories } from "@/hooks/categories";
import { useGetAllPosts } from "@/hooks/posts";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardsComponent from "./components/CardsComponent";
import CategoriesComponent from "./components/CategoriesComponent";
import Header from "./components/Header";
import PostComponent from "./components/PostComponent";
import MapComponent from "./components/mapComponents/MapComponent";

export default function Home({ navigation }: { navigation: any }) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const searchBarRef = useRef<TextInput>(null);
  const cardsContent = [
    {
      id: 1,
      type: "Restaurant",
      title: "Découvre des restaurants selon tes origines !",
      btnText: "Voir les restaurants",
      image: require("@/assets/images/card2.png"),
      color: COLORS.primaryColor,
    },
    {
      id: 2,
      type: "Evènements",
      title: "Découvre des évènements  autour de toi !",
      btnText: "Voir les évènements",
      image: require("@/assets/images/card1.png"),
      color: COLORS.secondaryColor,
    },
    {
      id: 3,
      title: "Découvre des supermarchés spécialement dédié à tes origines !",
      type: "Supermarché",
      btnText: "Voir les supermarchés",
      image: require("@/assets/images/card3.png"),
      color: COLORS.primaryColor,
    },
  ];
  const { data: postsData } = useGetAllPosts({
    cat: selectedCategory ?? "",
    nb: 2,
  });
  const { data: categories } = useGetCategories();

  const handleSearchPress = () => {
    searchBarRef.current?.focus();
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <ScreenContainer>
          <Header />
          <MapComponent
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchBarRef={searchBarRef}
          />
          <CategoriesComponent
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
          <FlatList
            data={cardsContent}
            style={{ marginBottom: 15 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CardsComponent {...item} />}
          />
          {postsData?.map((item: PostProps) => (
            <PostComponent key={item.id} {...item} />
          ))}
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={handleSearchPress}
          >
            <Text style={styles.searchText}>Recherche</Text>
          </TouchableOpacity>
          <Pressable
            onPress={() =>
              navigation.navigate(ROUTES.PostsScreen, {
                categoryId: selectedCategory,
                title: selectedCategory
                  ? categories?.find((item) => item.id == selectedCategory)
                      ?.name
                  : "Tous les lieux",
              })
            }
          >
            <Text style={styles.filterText}>
              {selectedCategory
                ? categories &&
                  "VOIR TOUS LES " +
                    categories
                      ?.find((item) => item.id == selectedCategory)
                      ?.name.toUpperCase()
                : "VOIR TOUS LES LIEUX"}
            </Text>
          </Pressable>
          <Text style={styles.infoText}>
            Profitez d'une remise de 10 à 15% dans nos restaurants partenaires,
            que ce soit lors de votre visite ou pour une commande à emporter, en
            utilisant le code "FRIENDDLY" au moment du paiement.
          </Text>
        </ScreenContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBtn: {
    width: "95%",
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    borderColor: "#000",
    borderWidth: 2,
  },
  searchText: {
    fontFamily: FONTS.poppinsMedium,
    marginTop: 3,
  },
  filterText: {
    fontFamily: FONTS.poppinsBold,
    alignSelf: "center",
    marginVertical: 15,
    textDecorationLine: "underline",
  },
  infoText: {
    fontFamily: FONTS.poppinsMedium,
    marginHorizontal: 10,
    marginBottom: 20,
  },
});
