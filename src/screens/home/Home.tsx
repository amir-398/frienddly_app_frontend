import { useTokenEffect } from "@/hooks/useTokenEffect";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  const { removeToken } = useTokenEffect();
  removeToken();
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
