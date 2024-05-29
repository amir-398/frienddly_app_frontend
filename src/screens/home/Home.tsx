import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import React from "react";
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

export default function Home() {
  const cardsContent = [
    {
      id: 1,
      title: "Découvre des restaurants selon tes origines !",
      btnText: "Voir les restaurants",
      image: require("@/assets/images/card2.png"),
      color: COLORS.secondaryColor,
    },
    {
      id: 2,
      title: "Découvre des évènements  autour de toi !",
      btnText: "Voir les évènements",
      image: require("@/assets/images/card1.png"),
      color: COLORS.primaryColor,
    },
    {
      id: 3,
      title: "Découvre des supermarchés spécialement dédié à tes origines !",
      btnText: "Voir les supermarchés",
      image: require("@/assets/images/card3.png"),
      color: COLORS.primaryColor,
    },
  ];

  const postsContent = [
    {
      id: 1,
      title: "Round eatery",
      note: "4.5",
      time: "30-40min",
      distance: "0.3mil",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLHl-acA8bMo8R2vF0arV19dWBkI9SnAa9lMeA6BL-mA&s",
    },
    {
      id: 2,
      title: "African Flavour",
      note: "4",
      time: "20-10min",
      distance: "0.2mil",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLHl-acA8bMo8R2vF0arV19dWBkI9SnAa9lMeA6BL-mA&s",
    },
  ];
  return (
    <ScrollView>
      <Header />
      <MapComponent />
      <CategoriesComponent />
      <FlatList
        data={cardsContent}
        style={{ marginHorizontal: 10, marginBottom: 15 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CardsComponent {...item} />}
      />
      {postsContent.map((item) => (
        <PostComponent key={item.id} {...item} />
      ))}
      <TouchableOpacity style={styles.searchBtn}>
        <Text style={styles.searchText}>Recherche</Text>
      </TouchableOpacity>
      <Pressable>
        <Text style={styles.filterText}>VOIR TOUS LES RESTAURANTS</Text>
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
