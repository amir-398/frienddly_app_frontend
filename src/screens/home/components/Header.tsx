import notifIcon from "@/assets/icons/notif.png";
import logo from "@/assets/logo/logo.png";
import FONTS from "@/constants/FONTS";
import Notification from "@/screens/notification/Notification";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
export default function Header() {
  const [notificationModalIsVisible, setNotificationModalIsVisible] =
    useState(false);
  return (
    <View style={styles.container}>
      <Notification
        isVisible={notificationModalIsVisible}
        setIsVisible={setNotificationModalIsVisible}
      />
      <View style={styles.left}>
        <Text style={styles.title}>Paris</Text>
      </View>
      <View style={styles.center}>
        <Image style={styles.logo} source={logo} />
      </View>
      <View style={styles.right}>
        <Pressable onPress={() => setNotificationModalIsVisible(true)}>
          <Image source={notifIcon} style={styles.notifIcon} />
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
