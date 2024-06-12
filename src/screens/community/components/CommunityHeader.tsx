import logo from "@/assets/logo/logo.png";
import InteractiveIcon from "@/components/InteractiveIcon";
import FONTS from "@/constants/FONTS";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import SearchUserModal from "./SearchUserModal";
export default function CommunityHeader() {
  const [searchModalIsVisible, setSearchModalIsVisible] = useState(false);
  return (
    <View style={styles.container}>
      <SearchUserModal
        visible={searchModalIsVisible}
        setIsVisible={setSearchModalIsVisible}
      />
      <View style={styles.left}>
        <Text style={styles.title}>Paris</Text>
      </View>
      <View style={styles.center}>
        <Image style={styles.logo} source={logo} />
      </View>
      <View style={styles.right}>
        <Pressable onPress={() => setSearchModalIsVisible(true)}>
          <InteractiveIcon
            onPress={() => setSearchModalIsVisible(true)}
            name="search"
            type="ionicon"
            color={"#000"}
            padding={5}
          />
        </Pressable>
      </View>
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
  left: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.poppinsBold,
  },
  center: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 130,
    height: 30,
  },
  right: {
    flex: 1,
    alignItems: "flex-end",
  },
  notifIcon: {
    width: 25,
    height: 25,
  },
});
