import logo from "@/assets/logo/logoLetter.png";
import COLORS from "@/constants/COLORS";
import { setIsLoading } from "@/redux/Slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

export default function LoadingScreen() {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.authSlice);
  const logoScale = useRef(new Animated.Value(0.2)).current;
  const animateLogo = () => {
    Animated.timing(logoScale, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    animateLogo();
  }, []);
  const lp_style = {
    transform: [{ scale: logoScale }],
  };

  useEffect(() => {
    if (userData) {
      setTimeout(() => {
        dispatch(setIsLoading(false));
      }, 1000);
    }
  });

  return (
    <LinearGradient
      colors={[COLORS.primaryColor, COLORS.secondaryColor]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <StatusBar backgroundColor={COLORS.primaryColor} />
      <Animated.Image source={logo} style={[styles.logo, lp_style]} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "20%",
    resizeMode: "contain",
  },
});
