import InteractiveIcon from "@/components/InteractiveIcon";
import ScreenContainer from "@/components/ScreenContainer";
import ImagePickerComponent from "@/components/modals/ImagePickerComponent";
import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import { S3ENDPOINTUSERIMAGES } from "@/constants/S3Endpoint";
import { useUpdateUserData } from "@/hooks/userData";
import { setUserData } from "@/redux/Slices/authSlice";
import { setBottomBarIsVisible } from "@/redux/Slices/bottomBarIsVisible";
import { useAppDispatch } from "@/redux/hooks";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
const atLeastOneFieldRequired = (fields, message) => {
  return Yup.mixed().test({
    name: "atLeastOneFieldRequired",
    exclusive: false,
    message: message || "Au moins un champ doit être rempli",
    test: function (value) {
      const { path, createError } = this;
      const isAnyFieldFilled = fields.some((field) => this.parent[field]);
      return isAnyFieldFilled || createError({ path, message });
    },
  });
};

// Liste des champs pour lesquels au moins un doit être rempli
const fieldsToCheck = [
  "firstname",
  "lastname",
  "description",
  "cityOfBirth",
  "Ilike",
  "favoriteShows",
  "centreOfInterest",
  "astrologicalSign",
  "favoriteArtists",
  "activity",
  "dreamCity",
];

// Schéma de validation Yup
const validationSchema = Yup.object()
  .shape({
    firstname: Yup.string(),
    lastname: Yup.string(),
    description: Yup.string(),
    cityOfBirth: Yup.string(),
    Ilike: Yup.string(),
    favoriteShows: Yup.string(),
    centreOfInterest: Yup.string(),
    astrologicalSign: Yup.string(),
    favoriteArtists: Yup.string(),
    activity: Yup.string(),
    dreamCity: Yup.string(),
  })
  .concat(
    Yup.object().shape({
      anyField: atLeastOneFieldRequired(
        fieldsToCheck,
        "Au moins un champ doit être rempli"
      ),
    })
  );
type ImageInfo = {
  [key: string]: string | number | null;
};
export default function EditProfilData({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { userInfo } = route.params;
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<ImageInfo | null>(null);

  const [imageError, setImageError] = useState("");
  const [imagePickerIsVisible, setImagePickerIsVisible] = useState(false);
  const { mutate: updateUserData } = useUpdateUserData();
  // hide bottom bar on first render
  useEffect(() => {
    dispatch(setBottomBarIsVisible(false));
    return () => {
      dispatch(setBottomBarIsVisible(true));
    };
  }, []);
  const handleSubmit = async (values: any) => {
    // Filtrer les valeurs non vides
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => v !== "")
    );
    updateUserData(filteredValues, {
      onSuccess: () => {
        dispatch(setUserData(filteredValues));
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  };
  return (
    <ScrollView style={styles.container}>
      <ImagePickerComponent
        isVisible={imagePickerIsVisible}
        setIsVisible={setImagePickerIsVisible}
        setImage={setImage}
        setImageError={setImageError}
      />
      <ScreenContainer>
        <View style={styles.header}>
          <View style={styles.headerIconContainer}>
            <InteractiveIcon
              onPress={() => navigation.goBack()}
              name="arrow-back"
              type="ionicon"
              size={24}
              color="#000"
              padding={5}
            />
          </View>
          <Text style={styles.headerTitle}>Modifier le profil</Text>
        </View>
        <View style={styles.changeImage}>
          <Image
            style={styles.imageProfilContainer}
            source={{ uri: S3ENDPOINTUSERIMAGES + userInfo.profilImage }}
          />
          <Pressable onPress={() => setImagePickerIsVisible(true)}>
            <Text style={styles.changeImageText}>Modifier la photo</Text>
          </Pressable>
        </View>
        <View>
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              description: "",
              cityOfBirth: "",
              Ilike: "",
              favoriteShows: "",
              centreOfInterest: "",
              astrologicalSign: "",
              favoriteArtists: "",
              activity: "",
              dreamCity: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>Prénom</Text>
                  <TextInput
                    onChangeText={handleChange("firstname")}
                    onBlur={handleBlur("firstname")}
                    value={values.firstname}
                    style={styles.textInput}
                    placeholder={userInfo.firstname}
                    cursorColor={"#000"}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>Nom</Text>
                  <TextInput
                    onChangeText={handleChange("lastname")}
                    onBlur={handleBlur("lastname")}
                    value={values.lastname}
                    style={styles.textInput}
                    placeholder={userInfo.lastname}
                    cursorColor={"#000"}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>Description</Text>
                  <TextInput
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    value={values.description}
                    style={styles.textInput}
                    placeholder={
                      userInfo.description
                        ? userInfo.description
                        : "Description"
                    }
                    cursorColor={"#000"}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>Ville de naissance</Text>
                  <TextInput
                    onChangeText={handleChange("cityOfBirth")}
                    onBlur={handleBlur("cityOfBirth")}
                    value={values.cityOfBirth}
                    style={styles.textInput}
                    placeholder={
                      userInfo.cityOfBirth
                        ? userInfo.cityOfBirth
                        : "Ville de naissance"
                    }
                    cursorColor={"#000"}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>J'adore</Text>
                  <TextInput
                    onChangeText={handleChange("Ilike")}
                    onBlur={handleBlur("Ilike")}
                    value={values.Ilike}
                    style={styles.textInput}
                    placeholder={userInfo.Ilike ? userInfo.Ilike : "J'adore"}
                    cursorColor={"#000"}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>Séries préférées</Text>
                  <TextInput
                    onChangeText={handleChange("favoriteShows")}
                    onBlur={handleBlur("favoriteShows")}
                    value={values.favoriteShows}
                    style={styles.textInput}
                    placeholder={
                      userInfo.favoriteShows
                        ? userInfo.favoriteShows
                        : "Séries préférées"
                    }
                    cursorColor={"#000"}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>Centre d'intérêt</Text>
                  <TextInput
                    onChangeText={handleChange("centreOfInterest")}
                    onBlur={handleBlur("centreOfInterest")}
                    value={values.centreOfInterest}
                    style={styles.textInput}
                    placeholder={
                      userInfo.centreOfInterest
                        ? userInfo.centreOfInterest
                        : "Centre d'intérêt"
                    }
                    cursorColor={"#000"}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>Signe astrologique</Text>
                  <TextInput
                    onChangeText={handleChange("astrologicalSign")}
                    onBlur={handleBlur("astrologicalSign")}
                    value={values.astrologicalSign}
                    style={styles.textInput}
                    placeholder={
                      userInfo.astrologicalSign
                        ? userInfo.astrologicalSign
                        : "Signe astrologique"
                    }
                    cursorColor={"#000"}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>Artistes préférés</Text>
                  <TextInput
                    onChangeText={handleChange("favoriteArtists")}
                    onBlur={handleBlur("favoriteArtists")}
                    value={values.favoriteArtists}
                    style={styles.textInput}
                    placeholder={
                      userInfo.favoriteArtists
                        ? userInfo.favoriteArtists
                        : "Artistes préférés"
                    }
                    cursorColor={"#000"}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>Activité</Text>
                  <TextInput
                    onChangeText={handleChange("activity")}
                    onBlur={handleBlur("activity")}
                    value={values.activity}
                    style={styles.textInput}
                    placeholder={
                      userInfo.activity ? userInfo.activity : "Activité"
                    }
                    cursorColor={"#000"}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>Ville de rêve</Text>
                  <TextInput
                    onChangeText={handleChange("dreamCity")}
                    onBlur={handleBlur("dreamCity")}
                    value={values.dreamCity}
                    style={styles.textInput}
                    placeholder={
                      userInfo.dreamCity ? userInfo.dreamCity : "Ville de rêve"
                    }
                    cursorColor={"#000"}
                  />
                </View>
                <TouchableOpacity
                  style={styles.saveBtn}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.saveBtnText}>Enregistrer</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>

        <View style={styles.btnsBottomContainer}>
          <View style={styles.btnsTop}>
            <Text style={styles.btnsTopText}>Changer de compte</Text>
          </View>
          <View style={styles.btnsBottom}>
            <Text style={styles.btnsBottomText}>Déconnexion</Text>
          </View>
        </View>
      </ScreenContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DEDEDE",
  },
  header: {
    alignItems: "center",
    position: "relative",
    height: 40,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  headerIconContainer: {
    position: "absolute",
    left: 10,
    top: 4,
  },
  headerTitle: {
    fontFamily: FONTS.poppinsBold,
    textAlign: "center",
    marginTop: 8,
  },
  changeImage: {
    alignItems: "center",
    marginVertical: 20,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  imageProfilContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeImageText: {
    fontFamily: FONTS.poppinsMedium,
    color: COLORS.primaryColor,
    fontSize: 16,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  inputTitle: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 12,
    marginVertical: 10,
  },
  textInput: {
    borderRadius: 10,
    padding: 10,
    position: "absolute",
    left: 150,
    fontFamily: FONTS.poppinsMedium,
    paddingTop: 10,
    width: "60%",
  },
  saveBtn: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 5,
    marginTop: 20,
    alignSelf: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontFamily: FONTS.poppinsMedium,
    marginTop: 2,
  },
  btnsBottomContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  btnsTop: {
    backgroundColor: "#fff",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 10,
    width: "100%",
    borderBottomColor: "#DEDEDE",
    borderBottomWidth: 1,
  },
  btnsTopText: {
    fontFamily: FONTS.poppinsMedium,
    textAlign: "center",
    color: COLORS.secondaryColor,
  },
  btnsBottom: {
    backgroundColor: "#fff",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
    width: "100%",
  },
  btnsBottomText: {
    fontFamily: FONTS.poppinsMedium,
    textAlign: "center",
    color: COLORS.primaryColor,
  },
});
