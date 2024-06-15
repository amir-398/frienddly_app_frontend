import partyIcon from "@/assets/images/party.png";
import restoIcon from "@/assets/images/resto.png";
import superIcon from "@/assets/images/supermarché.png";
import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import { CategoriesProps } from "@/types/categories";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CategoriesComponent({
  selectedCategory,
  setSelectedCategory,
  categories,
}: {
  selectedCategory: number | null;
  setSelectedCategory: (id: number | null) => void;
  categories: CategoriesProps[] | undefined;
}) {
  return (
    <View style={styles.container}>
      {categories?.map((category: CategoriesProps) => (
        <TouchableOpacity
          onPress={() =>
            selectedCategory === category.id
              ? setSelectedCategory(null)
              : setSelectedCategory(category.id)
          }
          style={[
            styles.category,
            selectedCategory === category.id && {
              borderColor: COLORS.primaryColor,
              borderWidth: 2,
              borderRadius: 10,
            },
          ]}
          key={category.id}
        >
          <Image
            style={styles.icon}
            source={
              category.id == 1
                ? restoIcon
                : category.id == 2
                ? partyIcon
                : superIcon
            }
          />
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    borderRadius: 25,
    marginVertical: 20,
    height: 100,
  },
  category: {
    width: "33.33%",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 50,
    height: 50,
  },
  categoryText: {
    fontFamily: FONTS.poppinsMedium,
  },
});
