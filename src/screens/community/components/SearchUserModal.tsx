import InteractiveIcon from "@/components/InteractiveIcon";
import ScreenContainer from "@/components/ScreenContainer";
import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
import { S3ENDPOINTUSERIMAGES } from "@/constants/S3Endpoint";
import { useSearchUsers } from "@/hooks/userData";
import { SearchUserPros } from "@/types/users";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  search: Yup.string().required("Required"),
});
export default function SearchUserModal({
  visible,
  setIsVisible,
}: {
  visible: boolean;
  setIsVisible: any;
}) {
  const navigation = useNavigation() as any;
  const { mutate: searchUsers, isPending: searchUsersIsPending } =
    useSearchUsers();
  const [searchResults, setSearchResults] = useState<
    SearchUserPros[] | undefined
  >(undefined);

  const handleSubmit = (values: { search: string }) => {
    const query = values.search;
    if (query.length === 0) return setSearchResults(undefined);
    searchUsers(query, {
      onSuccess: (data: any) => {
        setSearchResults(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  useEffect(() => {
    if (!visible) {
      setSearchResults(undefined);
    }
  }, [visible]);
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setIsVisible(false)}
      animationType="slide"
      statusBarTranslucent
    >
      <ScreenContainer>
        <View style={styles.header}>
          <InteractiveIcon
            name="arrow-back"
            type="ionicon"
            onPress={() => setIsVisible(false)}
            color="#000"
            padding={5}
          />
          <Formik
            initialValues={{
              search: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, handleChange, handleBlur, values }) => (
              <View style={styles.textInputContainer}>
                <Icon name="search" type="ionicon" color={"#000"} />
                <TextInput
                  style={styles.input}
                  placeholder="Rechercher un utilisateur"
                  onChangeText={(text) => {
                    handleChange("search")(text);
                    handleSubmit();
                  }}
                  onBlur={handleBlur("search")}
                  value={values.search}
                  autoFocus={true}
                  cursorColor={COLORS.primaryColor}
                />
              </View>
            )}
          </Formik>
        </View>
        <View style={styles.main}>
          {searchResults ? (
            searchUsersIsPending ? (
              <ActivityIndicator color={COLORS.primaryColor} size={40} />
            ) : (
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.searchResultContainer}
                numColumns={2}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.searchResult}
                    onPress={() => {
                      navigation.navigate(ROUTES.ProfilScreen, {
                        userId: item.id,
                      });
                      setIsVisible(false);
                    }}
                  >
                    <Image
                      source={{ uri: S3ENDPOINTUSERIMAGES + item.profilImage }}
                      style={styles.profilImage}
                    />
                    <Text style={styles.username}>
                      {item.firstname + " " + item.lastname}
                    </Text>
                    <View style={styles.seeProfilContainer}>
                      <Text style={styles.seeProfilText}>Voir profil</Text>
                    </View>
                  </Pressable>
                )}
              />
            )
          ) : (
            <Text style={styles.noneResult}>Aucun résultat pour le moment</Text>
          )}
        </View>
      </ScreenContainer>
    </Modal>
  );
}
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: COLORS.primaryColor,
    borderBottomWidth: 2,
    paddingVertical: 15,
    marginTop: 20,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: COLORS.primaryColor,
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,
    marginLeft: 10,
  },
  input: {
    width: "80%",
    marginLeft: 10,
    height: 40,
    fontFamily: FONTS.poppinsMedium,
    paddingTop: 4,
  },
  main: {
    marginTop: 20,
  },
  noneResult: {
    textAlign: "center",
    fontFamily: FONTS.poppinsMedium,
    fontSize: 16,
    color: "rgba(0,0,0,0.4)",
  },
  searchResultContainer: {
    marginTop: 20,
  },
  searchResult: {
    borderColor: COLORS.primaryColor,
    borderWidth: 1,
    borderRadius: 5,
    width: width / 2 - 30,
    height: 160,
    margin: 5,
  },
  profilImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 10,
  },
  seeProfilContainer: {
    backgroundColor: COLORS.primaryColor,
    padding: 5,
    borderRadius: 5,
    width: 100,
    alignSelf: "center",
  },
  seeProfilText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: FONTS.poppinsMedium,
    fontSize: 10,
    marginTop: 3,
  },
  username: {
    textAlign: "center",
    fontFamily: FONTS.poppinsMedium,
    fontSize: 16,
    marginTop: 3,
  },
});
