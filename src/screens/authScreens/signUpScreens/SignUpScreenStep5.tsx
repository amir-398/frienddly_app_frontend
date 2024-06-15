import ScreenContainer from "@/components/ScreenContainer";
import ImagePickerComponent from "@/components/modals/ImagePickerComponent";
import FONTS from "@/constants/FONTS";
import { useRegister } from "@/hooks/auth";
import { useTokenEffect } from "@/hooks/useTokenEffect";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import ScreenBackground from "../components/ScreenBackground";
import AuthBtn from "./components/AuthBtn";
import HeaderComponent from "./components/HeaderComponent";
type ImageInfo = {
  [key: string]: string | number | null;
};
export default function SignUpScreenStep6({ navigation }: { navigation: any }) {
  const userInfo = useAppSelector(
    (state) => state.signUpUserInfoSlice.userInfo
  );
  const { storeToken } = useTokenEffect();
  const [image, setImage] = useState<ImageInfo | null>(null);
  const [imageError, setImageError] = useState("");
  const [imagePickerIsVisible, setImagePickerIsVisible] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const { mutate: userRegister, isPending: UserRegisterIsPending } =
    useRegister();

  //check if image is selected
  useEffect(() => {
    if (image) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  });

  //create form Data with user Data
  const createFormData = (imageData: any) => {
    const imageName = imageData?.fileName;
    const imageMimeType = imageData?.mimeType;
    const imageUri = imageData?.uri;
    const formData = new FormData();
    formData.append("profilImage", {
      uri: imageUri,
      name: `image/${imageName}`,
      type: imageMimeType,
    } as unknown as Blob);
    formData.append("firstname", userInfo.firstname as string);
    formData.append("lastname", userInfo.lastname as string);
    formData.append("email", userInfo.email as string);
    formData.append("password", userInfo.password as string);
    formData.append("birthDate", userInfo.birthDate as string);
    return formData;
  };

  const onSubmit = async () => {
    const formData = createFormData(image);
    userRegister(formData, {
      onSuccess: (data) => {
        const token = data.token.token;
        const streamtoken = data.streamToken;
        storeToken(token, streamtoken);
      },
      onError: (error) => {
        console.error("Registration failed", error.message);
      },
    });
  };
  return (
    <ScreenBackground>
      <ScreenContainer>
        <ImagePickerComponent
          isVisible={imagePickerIsVisible}
          setIsVisible={setImagePickerIsVisible}
          setImage={setImage}
          setImageError={setImageError}
        />
        <HeaderComponent title="Ajouter votre photo de profil" />
        {image ? (
          <TouchableOpacity onPress={() => setImagePickerIsVisible(true)}>
            <Image
              source={{ uri: image?.uri as string }}
              style={styles.imagePicked}
            />
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
        <AuthBtn
          title="Terminer"
          onPress={onSubmit}
          loading={UserRegisterIsPending}
          disabled={btnDisabled}
        />
      </ScreenContainer>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  wrapperImagePicker: {
    height: 200,
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 15,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  imagePicked: {
    aspectRatio: 1,
    height: 200,
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 30,
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
