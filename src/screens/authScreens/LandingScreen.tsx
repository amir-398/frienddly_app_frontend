import lpImg from "@/assets/images/image_lp.png";
import google_logo from "@/assets/images/logo-google.png";
import logo_image from "@/assets/logo/logo.png";
import Btn from "@/components/Btn";
import ScreenContainer from "@/components/ScreenContainer";
import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function LandingScreen({ navigation }: { navigation: any }) {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Image source={logo_image} style={styles.logo} />

        <Text style={styles.sloganText}>Kote tout moun sé fanmi</Text>
        <Image source={lpImg} style={styles.lpImage} />
        <View style={styles.btnContainer}>
          <Btn
            title="Se connecter"
            onPress={() => navigation.navigate(ROUTES.SignInScreen)}
            style={styles.leftBtn}
            textStyle={{ color: COLORS.secondaryColor }}
          />
          <Btn
            title="S'inscrire"
            onPress={() => navigation.navigate(ROUTES.SignUpScreenStep1)}
            style={styles.rightBtn}
            textStyle={{ color: "#fff" }}
          />
        </View>
        <View style={styles.separatorContainer}>
          <View style={styles.line}></View>
          <Text style={styles.separatorText}>Ou</Text>
          <View style={styles.line}></View>
        </View>
        <TouchableOpacity
          style={styles.googleIconBtn}
          onPress={() => console.log("google")}
        >
          <Image source={google_logo} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",

    paddingTop: "20%",
  },
  logo: {
    width: "60%",
    resizeMode: "contain",
  },
  sloganText: {
    fontSize: 18,
    color: COLORS.secondaryColor,
    fontFamily: FONTS.poppinsMedium,
  },
  lpImage: {
    width: "90%",
    height: 150,
    marginVertical: 80,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  rightBtn: {
    backgroundColor: COLORS.secondaryColor,
  },
  leftBtn: {
    borderColor: COLORS.secondaryColor,
    borderWidth: 1,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginTop: 40,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.secondaryColor,
  },
  separatorText: {
    marginHorizontal: 10,
    color: COLORS.secondaryColor,
    fontFamily: FONTS.poppinsMedium,
  },
  googleIconBtn: {
    borderRadius: 50,
    borderColor: COLORS.primaryColor,
    borderWidth: 1,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
