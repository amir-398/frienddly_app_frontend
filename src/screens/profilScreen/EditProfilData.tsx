import InteractiveIcon from "@/components/InteractiveIcon";
import ScreenContainer from "@/components/ScreenContainer";
import ImagePickerComponent from "@/components/modals/ImagePickerComponent";
import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import { S3ENDPOINTUSERIMAGES } from "@/constants/S3Endpoint";
import { useTokenEffect } from "@/hooks/useTokenEffect";
import { useDeleteUserData, useUpdateUserData } from "@/hooks/userData";
import { deleteToken, setUserData } from "@/redux/Slices/authSlice";
import { setBottomBarIsVisible } from "@/redux/Slices/bottomBarIsVisible";
import { useAppDispatch } from "@/redux/hooks";
import { decodeText } from "@/utils/decodes/decodeText";
import { FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
  "iLike",
  "favoriteShows",
  "centerOfInterest",
  "astrologicalSign",
  "favoriteArtists",
  "activity",
  "dreamCity",
  "image",
];

// Schéma de validation Yup
const validationSchema = Yup.object()
  .shape({
    firstname: Yup.string(),
    lastname: Yup.string(),
    description: Yup.string(),
    cityOfBirth: Yup.string(),
    iLike: Yup.string(),
    favoriteShows: Yup.string(),
    centerOfInterest: Yup.string(),
    astrologicalSign: Yup.string(),
    favoriteArtists: Yup.string(),
    activity: Yup.string(),
    dreamCity: Yup.string(),
    image: Yup.string(),
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
  const { removeToken } = useTokenEffect();
  const [image, setImage] = useState<ImageInfo | null>(null);
  const [imageError, setImageError] = useState("");
  const [imagePickerIsVisible, setImagePickerIsVisible] = useState(false);

  const { mutate: updateUserData, isPending: updateUserDataIsPending } =
    useUpdateUserData();

  const { mutate: deleteUser, isSuccess } = useDeleteUserData();

  const formikProps = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      description: "",
      cityOfBirth: "",
      iLike: "",
      favoriteShows: "",
      centerOfInterest: "",
      astrologicalSign: "",
      favoriteArtists: "",
      activity: "",
      dreamCity: "",
      image: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  // Hide bottom bar on first render
  useEffect(() => {
    dispatch(setBottomBarIsVisible(false));
    return () => {
      dispatch(setBottomBarIsVisible(true));
    };
  }, []);

  useEffect(() => {
    if (image) {
      formikProps.setFieldValue("image", image.uri);
    }
  }, [image]);

  // Submition function to update user data
  const handleSubmit = async (values: any): Promise<any> => {
    const formData = new FormData();
    if (image) {
      const imageName = image?.fileName;
      const imageMimeType = image?.mimeType;
      const imageUri = image?.uri;
      formData.append("profilImage", {
        uri: imageUri,
        name: imageName,
        type: imageMimeType,
      } as unknown as Blob);
    }

    // Filtrer les valeurs non vides
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => v !== "")
    );
    // Ajouter les valeurs filtrées au FormData
    filteredValues &&
      Object.entries(filteredValues).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
    updateUserData(formData, {
      onSuccess: (response) => {
        dispatch(setUserData(response.data));
        navigation.goBack();
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  };

  const handleDisconnect = () => {
    removeToken();
  };

  const deleteUserAccount = () => {
    console.log("delete user account");

    try {
      deleteUser();
      isSuccess && deleteToken();
    } catch (error) {
      console.log(error.message);
    }
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
            source={{
              uri: image
                ? image.uri
                : S3ENDPOINTUSERIMAGES + userInfo.profilImage,
            }}
          />
          <Pressable onPress={() => setImagePickerIsVisible(true)}>
            <Text style={styles.changeImageText}>Modifier la photo</Text>
          </Pressable>
        </View>
        <View>
          <FormikProvider value={formikProps}>
            <View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Prénom</Text>
                <TextInput
                  onChangeText={formikProps.handleChange("firstname")}
                  onBlur={formikProps.handleBlur("firstname")}
                  value={formikProps.values.firstname}
                  multiline={true}
                  style={styles.textInput}
                  placeholder={userInfo.firstname}
                  cursorColor={"#000"}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Nom</Text>
                <TextInput
                  onChangeText={formikProps.handleChange("lastname")}
                  onBlur={formikProps.handleBlur("lastname")}
                  value={formikProps.values.lastname}
                  multiline={true}
                  style={styles.textInput}
                  placeholder={userInfo.lastname}
                  cursorColor={"#000"}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Description</Text>
                <TextInput
                  onChangeText={formikProps.handleChange("description")}
                  onBlur={formikProps.handleBlur("description")}
                  value={formikProps.values.description}
                  style={styles.textInput}
                  multiline={true}
                  placeholder={
                    userInfo.description
                      ? decodeText(
                          userInfo.description.length > 50
                            ? userInfo.description.substring(0, 50) + "..."
                            : userInfo.description
                        )
                      : "Description"
                  }
                  cursorColor={"#000"}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Ville de naissance</Text>
                <TextInput
                  onChangeText={formikProps.handleChange("cityOfBirth")}
                  onBlur={formikProps.handleBlur("cityOfBirth")}
                  value={formikProps.values.cityOfBirth}
                  style={styles.textInput}
                  multiline={true}
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
                  onChangeText={formikProps.handleChange("iLike")}
                  onBlur={formikProps.handleBlur("iLike")}
                  value={formikProps.values.iLike}
                  style={styles.textInput}
                  multiline={true}
                  placeholder={userInfo.iLike ? userInfo.iLike : "J'adore"}
                  cursorColor={"#000"}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Séries préférées</Text>
                <TextInput
                  onChangeText={formikProps.handleChange("favoriteShows")}
                  onBlur={formikProps.handleBlur("favoriteShows")}
                  value={formikProps.values.favoriteShows}
                  style={styles.textInput}
                  multiline={true}
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
                  onChangeText={formikProps.handleChange("centerOfInterest")}
                  onBlur={formikProps.handleBlur("centerOfInterest")}
                  value={formikProps.values.centerOfInterest}
                  style={styles.textInput}
                  multiline={true}
                  placeholder={
                    userInfo.centerOfInterest
                      ? userInfo.centerOfInterest
                      : "Centre d'intérêt"
                  }
                  cursorColor={"#000"}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Signe astrologique</Text>
                <TextInput
                  onChangeText={formikProps.handleChange("astrologicalSign")}
                  onBlur={formikProps.handleBlur("astrologicalSign")}
                  value={formikProps.values.astrologicalSign}
                  style={styles.textInput}
                  multiline={true}
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
                  onChangeText={formikProps.handleChange("favoriteArtists")}
                  onBlur={formikProps.handleBlur("favoriteArtists")}
                  value={formikProps.values.favoriteArtists}
                  style={styles.textInput}
                  multiline={true}
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
                  onChangeText={formikProps.handleChange("activity")}
                  onBlur={formikProps.handleBlur("activity")}
                  value={formikProps.values.activity}
                  style={styles.textInput}
                  multiline={true}
                  placeholder={
                    userInfo.activity ? userInfo.activity : "Activité"
                  }
                  cursorColor={"#000"}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Ville de rêve</Text>
                <TextInput
                  onChangeText={formikProps.handleChange("dreamCity")}
                  onBlur={formikProps.handleBlur("dreamCity")}
                  value={formikProps.values.dreamCity}
                  style={styles.textInput}
                  multiline={true}
                  placeholder={
                    userInfo.dreamCity ? userInfo.dreamCity : "Ville de rêve"
                  }
                  cursorColor={"#000"}
                />
              </View>
              <TouchableOpacity
                style={[
                  styles.saveBtn,
                  (updateUserDataIsPending ||
                    !(formikProps.isValid && formikProps.dirty)) && {
                    opacity: 0.5,
                  },
                ]}
                onPress={() => formikProps.handleSubmit()}
                disabled={
                  updateUserDataIsPending ||
                  !(formikProps.isValid && formikProps.dirty)
                }
              >
                {updateUserDataIsPending ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.saveBtnText}>Enregistrer</Text>
                )}
              </TouchableOpacity>
            </View>
          </FormikProvider>
        </View>

        <View style={styles.btnsBottomContainer}>
          <Pressable style={styles.btnsTop} onPress={deleteUserAccount}>
            <Text style={styles.btnsTopText}>Supprimer votre compte</Text>
          </Pressable>
          <Pressable style={styles.btnsBottom} onPress={handleDisconnect}>
            <Text style={styles.btnsBottomText}>Déconnexion</Text>
          </Pressable>
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
    width: "40%",
  },
  textInput: {
    borderRadius: 10,
    fontFamily: FONTS.poppinsMedium,
    width: "60%",
    paddingVertical: 10,
  },
  saveBtn: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 20,
    height: 50,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
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
