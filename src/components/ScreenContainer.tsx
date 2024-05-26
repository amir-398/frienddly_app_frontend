import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
export default function ScreenContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const COLORS = {
    primaryColor: "rgba(230, 99, 87, 0.8)", // Couleur avec 80% d'opacité
    secondaryColor: "rgba(166, 196, 136, 0.8)", // Couleur avec 80% d'opacité
  };
  return (
    <LinearGradient
      colors={[COLORS.secondaryColor, COLORS.primaryColor]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <StatusBar backgroundColor={COLORS.secondaryColor} />
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
});
