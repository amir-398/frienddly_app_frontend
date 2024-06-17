import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
import { useNavigation } from "@react-navigation/native";
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
  id: number;
  title: string;
  btnText: string;
  image: any;
  color: string;
  type: string;
}
export default function CardsComponent(props: CardsComponentProps) {
  const navigation = useNavigation() as any;
  const { id, title, btnText, image, color, type } = props;

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        <Pressable
          style={styles.btn}
          onPress={() =>
            navigation.navigate(ROUTES.PostsScreen, {
              categoryId: id,
              title: type,
            })
          }
        >
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
    width: width - 80,
    height: 170,
    marginRight: 10,
    borderRadius: 20,
  },
  left: {
    width: "60%",
    height: "100%",
    paddingLeft: 10,
    justifyContent: "space-between",
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  title: {
    color: "#000",
    fontSize: 15,
    fontWeight: "bold",
    width: "80%",

    fontFamily: FONTS.poppinsBold,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "90%",
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  btnText: {
    fontSize: 9,
    fontFamily: FONTS.poppinsBold,
    marginTop: 2,
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
