import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AuthBtn({
  title,
  onPress,
  disabled,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <View style={styles.containerBtn}>
      <TouchableOpacity
        style={[styles.btn, disabled ? styles.btnDisabled : undefined]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  containerBtn: {
    alignSelf: "center",
    height: height,
    width: "100%",
    justifyContent: "flex-end",
    zIndex: -1,
    position: "absolute",
    paddingBottom: height * 0.08,
    paddingHorizontal: 20,
  },
  btn: {
    backgroundColor: COLORS.secondaryColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 15,
    width: width - 40,
    alignSelf: "center",
  },
  btnDisabled: {
    opacity: 0.4,
  },
  text: {
    color: "#fff",
    fontFamily: FONTS.poppinsMedium,
    fontSize: 18,
  },
});
