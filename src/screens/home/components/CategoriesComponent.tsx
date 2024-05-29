import partyIcon from "@/assets/images/party.png";
import restoIcon from "@/assets/images/resto.png";
import superIcon from "@/assets/images/supermarché.png";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Category {
  id: number;
  name: string;
}
export default function CategoriesComponent({
  selectedCategory,
  setSelectedCategory,
  categories,
}: {
  selectedCategory: number | null;
  setSelectedCategory: (id: number) => void;
  categories: Category[];
}) {
  return (
    <View style={styles.container}>
      {categories?.map((category: Category) => (
        <TouchableOpacity
          onPress={() => setSelectedCategory(category.id)}
          style={styles.category}
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
          <Text>{category.name}</Text>
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
    backgroundColor: "#fff",
    borderRadius: 25,
    marginVertical: 20,
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
});
