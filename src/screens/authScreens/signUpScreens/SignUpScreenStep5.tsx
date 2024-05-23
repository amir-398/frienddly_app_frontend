import ScreenContainer from "@/components/ScreenContainer";
import ImagePickerComponent from "@/components/modals/ImagePickerComponent";
import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import { useRegister } from "@/hooks/auth";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import AuthBtn from "./components/AuthBtn";
import HeaderComponent from "./components/HeaderComponent";

export default function SignUpScreenStep6({ navigation }: { navigation: any }) {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.userInfoSlice.userInfo);
  const [formDataImage, setFormDataImage] = useState<object | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState("");
  const [imagePickerIsVisible, setImagePickerIsVisible] = useState(false);

  const { mutate, data, isLoading, isSuccess, error } = useRegister();
  const userData = {
    firstname: "John",
    lastname: "Doe",
    email: "amir.398@gmail.col",
    password: "123456",
    profileImage: formDataImage,
  };
  const imageUri = image?.uri;
  console.log("imageUri", image);

  const onSubmit = async () => {
    const imageName = image?.fileName;
    const imageMimeType = image?.mimeType;
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      name: `image/${imageName}`,
      type: imageMimeType,
    });
    console.log("formData", formData);

    try {
      const response = await fetch(
        "http://192.168.1.81:3333/api/v1/auth/register",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = await response.json();
      console.log("Upload success", data);
    } catch (error) {
      console.error("Upload failed", error);
    }
    // mutate(fetchImage(), {
    //   onSuccess: (data) => {
    //     console.log("Registration successful", data);
    //     // Gestion du succès, par exemple navigation ou mise à jour de l'état
    //   },
    //   onError: (error) => {
    //     console.error("Registration failed", error);
    //     // Gestion des erreurs, par exemple affichage d'un message d'erreur
    //   },
    // });
  };
  return (
    <ScreenContainer>
      <ImagePickerComponent
        isVisible={imagePickerIsVisible}
        setIsVisible={setImagePickerIsVisible}
        setImage={setImage}
        setImageError={setImageError}
      />
      <HeaderComponent title="Ajouter votre photo de profil" />
      {image ? (
        <TouchableOpacity
          style={styles.wrapperImagePicker}
          onPress={() => setImagePickerIsVisible(true)}
        >
          <Image source={{ uri: imageUri }} style={styles.imagePicked} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.wrapperImagePicker}
          onPress={() => setImagePickerIsVisible(true)}
        >
          <Text style={styles.plus}>+</Text>
          <Text style={styles.addPhoto}>Photo de profil</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.imageError}>{imageError}</Text>
      <AuthBtn title="Suivant" onPress={onSubmit} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrapperImagePicker: {
    height: 150,
    borderColor: COLORS.secondaryColor,
    borderWidth: 2,
    borderRadius: 15,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  imagePicked: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  plus: {
    color: "#000",
    fontSize: 25,
    fontWeight: "300",
  },
  addPhoto: {
    color: "#000",
    fontSize: 12,
    fontFamily: FONTS.poppinsMedium,
  },
  imageError: {
    color: "red",
    fontFamily: FONTS.poppinsMedium,
    textAlign: "center",
    fontSize: 12,
    marginTop: 10,
  },
});
