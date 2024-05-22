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
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.containerBtn}>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
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
    paddingBottom: 20,
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
  text: {
    color: "#fff",
    fontFamily: FONTS.poppinsMedium,
    fontSize: 18,
  },
});
