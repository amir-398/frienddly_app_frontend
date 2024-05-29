import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import { useGetCategories } from "@/hooks/categories";
import { useGetAllPosts } from "@/hooks/posts";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import CardsComponent from "./components/CardsComponent";
import CategoriesComponent from "./components/CategoriesComponent";
import Header from "./components/Header";
import PostComponent from "./components/PostComponent";
import MapComponent from "./components/mapComponents/MapComponent";
interface Post {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  category: {
    id: number;
    name: string;
  };
  images: [
    {
      url: string;
      postId: number;
      id: number;
    }
  ];
}
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const cardsContent = [
    {
      id: 1,
      title: "Découvre des restaurants selon tes origines !",
      btnText: "Voir les restaurants",
      image: require("@/assets/images/card2.png"),
      color: COLORS.primaryColor,
    },
    {
      id: 2,
      title: "Découvre des évènements  autour de toi !",
      btnText: "Voir les évènements",
      image: require("@/assets/images/card1.png"),
      color: COLORS.secondaryColor,
    },
    {
      id: 3,
      title: "Découvre des supermarchés spécialement dédié à tes origines !",
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
  return (
    <ScrollView>
      <Header />
      <MapComponent
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <CategoriesComponent
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <FlatList
        data={cardsContent}
        style={{ marginHorizontal: 10, marginBottom: 15 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CardsComponent {...item} />}
      />
      {postsData?.map((item: Post) => (
        <PostComponent key={item.id} {...item} />
      ))}
      <TouchableOpacity style={styles.searchBtn}>
        <Text style={styles.searchText}>Recherche</Text>
      </TouchableOpacity>
      <Pressable>
        <Text style={styles.filterText}>
          VOIR TOUS LES{" "}
          {selectedCategory
            ? categories &&
              categories?.find((item) => item.id == selectedCategory)?.name
            : categories && categories[0]?.name?.toUpperCase()}
        </Text>
      </Pressable>
      <Text style={styles.infoText}>
        Profitez d'une remise de 10 à 15% dans nos restaurants partenaires, que
        ce soit lors de votre visite ou pour une commande à emporter, en
        utilisant le code "FRIENDDLY" au moment du paiement.
      </Text>
    </ScrollView>
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
    fontFamily: FONTS.poppinsMedium,
    alignSelf: "center",
    marginVertical: 15,
  },
  infoText: {
    fontFamily: FONTS.poppinsMedium,
    marginHorizontal: 10,
    marginBottom: 20,
  },
});
