import filterIcon from "@/assets/icons/filter.png";
import { Icon } from "@rneui/base";
import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
export default function SearchBar() {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Icon name="search" type="ionicon" />
      </View>
      <TextInput
        style={styles.input}
        placeholder="De quoi as-tu envie aujourd’hui ?"
        placeholderTextColor={"grey"}
      />
      <View style={styles.right}>
        <Image style={styles.filterIcon} source={filterIcon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    alignSelf: "center",
    top: 10,
    width: "90%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
  },
  left: {
    width: "12.5%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "75%",
    height: 40,
    borderRightColor: "grey",
    borderRightWidth: 1,
  },
  right: {
    width: "12.5%",
    alignItems: "center",
    justifyContent: "center",
  },
  filterIcon: {
    width: 25,
    height: 25,
  },
});
