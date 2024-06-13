import filterIcon from "@/assets/icons/filter.png";
import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { Formik } from "formik";
import React from "react";
import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  search: Yup.string().required("Veuillez entrer un mot-clé"),
});
export default function SearchBar({
  setFilterModalVisible,
  searchBarRef,
}: {
  setFilterModalVisible: (visible: boolean) => void;
  searchBarRef: any;
}) {
  const navigation = useNavigation();
  const handleSubmit = (values: { search: string }) => {
    navigation.navigate(ROUTES.PostsScreen, {
      q: values.search,
      title: "Résultats de recherche",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Icon name="search" type="ionicon" />
      </View>
      <Formik
        initialValues={{ search: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <TextInput
            style={styles.input}
            placeholder="De quoi as-tu envie aujourd’hui ?"
            placeholderTextColor={"grey"}
            onChangeText={handleChange("search")}
            onBlur={handleBlur("search")}
            value={values.search}
            returnKeyType="search"
            onSubmitEditing={() => handleSubmit()}
            ref={searchBarRef}
            cursorColor={"#000"}
          />
        )}
      </Formik>
      <Pressable
        style={styles.right}
        onPress={() => setFilterModalVisible(true)}
      >
        <Image style={styles.filterIcon} source={filterIcon} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    alignSelf: "center",
    top: 10,
    width: "90%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
  },
  left: {
    width: "12.5%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "75%",
    height: 40,
    borderRightColor: "grey",
    borderRightWidth: 1,
    fontFamily: FONTS.poppinsRegular,
    fontSize: 12,
    paddingTop: 3,
  },
  right: {
    width: "12.5%",
    alignItems: "center",
    justifyContent: "center",
  },
  filterIcon: {
    width: 25,
    height: 25,
  },
});
