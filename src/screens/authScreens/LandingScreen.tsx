import facebook_logo from "@/assets/icons/facebook-icon.png";
import logo_google from "@/assets/icons/google-Icon.png";
import logo_image from "@/assets/logo/logo.png";
import ScreenContainer from "@/components/ScreenContainer";
import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
import { Icon } from "@rneui/themed";
import { BlurView } from "expo-blur";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenBackground from "./components/ScreenBackground";
export default function LandingScreen({ navigation }: { navigation: any }) {
  const [pageType, setPageType] = React.useState<"login" | "register">(
    "register"
  );
  return (
    <ScreenBackground>
      <ScreenContainer>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={logo_image} style={styles.logo} />
          </View>
          <BlurView intensity={50} style={styles.wrapper}>
            <Text style={styles.titleText}>
              {pageType == "login"
                ? "Connecte toi à Frienddly"
                : "Inscris toi à Frienddly"}
            </Text>
            <Text style={styles.sloganText}>Kote tout moun sé fanmi</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  pageType == "login"
                    ? ROUTES.SignInScreen
                    : ROUTES.SignUpScreenStep1
                )
              }
              style={styles.btn}
            >
              <View style={styles.iconBtnContainer}>
                <Icon
                  name="mail-outline"
                  type="ionicon"
                  color={COLORS.primaryColor}
                  size={30}
                />
              </View>
              <Text style={styles.btnText}>
                {pageType == "login" ? "Se connecter" : "S'inscrire"} avec un
                mail
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={styles.btn}
            >
              <View style={styles.iconBtnContainer}>
                <Image source={logo_google} style={styles.btnIcon} />
              </View>
              <Text style={[styles.btnText, { color: "#fff" }]}>
                Continuer avec Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={styles.btn}
            >
              <View style={styles.iconBtnContainer}>
                <Image source={facebook_logo} style={styles.btnIcon} />
              </View>
              <Text style={[styles.btnText, { color: "#fff" }]}>
                Continuer avec Facebook
              </Text>
            </TouchableOpacity>
            {pageType == "register" && (
              <Text style={styles.bottomText}>
                En continuant, je déclare accepter{" "}
                <TouchableNativeFeedback onPress={() => alert("lol")}>
                  <Text
                    style={{
                      color: COLORS.primaryColor,
                      fontFamily: FONTS.poppinsBold,
                      textDecorationLine: "underline",
                    }}
                  >
                    conditions génerales d'utilisation
                  </Text>
                </TouchableNativeFeedback>{" "}
                de Frienddly
              </Text>
            )}
          </BlurView>
        </View>
      </ScreenContainer>
      <BlurView intensity={50} style={styles.bottomContainer}>
        <Text style={styles.bottomText}>
          {pageType == "login"
            ? "Tu as déja un compte ?"
            : "Tu n'as pas encore de compte ?"}{" "}
          <TouchableNativeFeedback
            onPress={() =>
              setPageType(pageType == "login" ? "register" : "login")
            }
          >
            <Text
              style={{
                color: COLORS.primaryColor,
                fontFamily: FONTS.poppinsBold,
                textDecorationLine: "underline",
              }}
            >
              {pageType == "login" ? "Connecte toi" : "Inscris toi"}
            </Text>
          </TouchableNativeFeedback>
        </Text>
      </BlurView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: "20%",
  },
  logoContainer: {
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    width: 300,
    height: 100,
    marginBottom: 50,
  },
  logo: {
    width: "80%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  wrapper: {
    alignItems: "center",
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  titleText: {
    fontSize: 20,
    fontFamily: FONTS.poppinsBold,
  },
  sloganText: {
    fontSize: 18,
    color: COLORS.primaryColor,
    fontFamily: FONTS.poppinsBold,
    marginBottom: 20,
  },
  btn: {
    position: "relative",
    backgroundColor: "rgba(255,255,255,0.2)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 13,
    borderRadius: 5,
    borderColor: COLORS.primaryColor,
    borderWidth: 2,
    marginVertical: 5,
  },
  iconBtnContainer: {
    position: "absolute",
    left: 10,
  },
  btnIcon: {
    width: 30,
    height: 30,
  },
  btnText: {
    color: COLORS.primaryColor,
    fontFamily: FONTS.poppinsBold,
  },
  bottomText: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 12,
    marginTop: 10,
    textAlign: "center",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 20,
  },
});
