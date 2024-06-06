import React from "react";
import { StyleSheet, View } from "react-native";
export default function ScreenContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const COLORS = {
    primaryColor: "rgba(230, 99, 87, 0.8)", // Couleur avec 80% d'opacité
    secondaryColor: "rgba(166, 196, 136, 0.8)", // Couleur avec 80% d'opacité
  };
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
