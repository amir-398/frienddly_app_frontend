import FONTS from "@/constants/FONTS";
import { Icon } from "@rneui/themed";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
interface CardsComponentProps {
  title: string;
  btnText: string;
  image: any;
  color: string;
}
export default function CardsComponent(props: CardsComponentProps) {
  const { title, btnText, image, color } = props;

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>{btnText}</Text>
          <Icon name="chevron-forward" type="ionicon" size={20} />
        </Pressable>
      </View>
      <View style={styles.right}>
        <Image style={styles.image} source={image} />
      </View>
    </View>
  );
}
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: width - 20,
    height: 170,
    marginRight: 10,
    borderRadius: 20,
  },
  left: {
    width: "60%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  title: {
    color: "#000",
    fontSize: 17,
    fontWeight: "bold",
    width: "80%",

    fontFamily: FONTS.poppinsBold,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "80%",
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  btnText: {
    fontSize: 11,
    fontFamily: FONTS.poppinsMedium,
    marginTop: 3,
  },
  right: {
    width: "40%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});
