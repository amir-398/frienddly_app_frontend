import logo from "@/assets/logo/logo.png";
import { Icon } from "@rneui/themed";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
export default function Header() {
  return (
    <View style={styles.container}>
      <Icon name="filter-circle" type="ionicon" size={30} />
      <Image style={styles.logo} source={logo} />
      <Icon name="notifications" type="ionicon" size={30} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#f1f1f1",
  },
  logo: {
    width: 130,
    height: 30,
  },
});
