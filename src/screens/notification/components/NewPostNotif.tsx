import logo from "@/assets/logo/logo_2.png";
import FONTS from "@/constants/FONTS";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
export default function NewPostNotif() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.left}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.headerText}>FRIENDDLY</Text>
        </View>
        <Text style={styles.notifTime}>3m</Text>
      </View>
      <View>
        <Text style={styles.mainTitle}>Nouveau Bar</Text>
        <View style={styles.mainWrapper}>
          <View style={styles.leftWrapper}>
            <Text style={styles.mainText}>
              Le restaurant 'Oh Mama' vient d'ouvrir en ville, offrant une
              cuisine raffinée.
            </Text>
          </View>
          <Image source={logo} style={styles.profilImage} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 20,
    height: 20,
  },
  headerText: {
    fontSize: 15,
    fontFamily: FONTS.poppinsRegular,
    marginLeft: 5,
    marginTop: 2,
    color: "rgba(0,0,0,0.7)",
  },
  notifTime: {
    fontSize: 12,
    fontFamily: FONTS.poppinsRegular,
    marginLeft: 5,
    marginTop: 2,
    color: "rgba(0,0,0,0.7)",
  },
  mainTitle: {
    fontFamily: FONTS.poppinsBold,
    fontSize: 16,
    marginTop: 5,
  },
  mainWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftWrapper: {
    width: "80%",
  },
  mainText: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 14,
  },

  profilImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
});
