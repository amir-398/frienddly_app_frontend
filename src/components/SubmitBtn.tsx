import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function SubmitBtn({
  title,
  onPress,
  disabled,
  loading,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.btn, disabled || loading ? styles.btnDisabled : undefined]}
      onPress={onPress}
      disabled={loading || disabled}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.primaryColor} size={30.5} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
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
