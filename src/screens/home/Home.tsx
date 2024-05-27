import { useTokenEffect } from "@/hooks/useTokenEffect";
import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import MapComponent from "./components/MapComponent";

export default function Home() {
  const { removeToken } = useTokenEffect();
  // removeToken();
  return (
    <View>
      <Header />
      <MapComponent />
    </View>
  );
}

const styles = StyleSheet.create({});
