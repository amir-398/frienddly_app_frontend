import ScreenContainer from "@/components/ScreenContainer";
import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import { useAppDispatch } from "@/redux/hooks";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import AuthBtn from "./components/AuthBtn";
import HeaderComponent from "./components/HeaderComponent";

export default function SignUpScreenStep6({ navigation }: { navigation: any }) {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState("");
  const [imagePickerModal, setImagePickerModal] = useState(false);
  const onSubmit = () => {};

  return (
    <ScreenContainer>
      <HeaderComponent title="Ajouter votre photo de profil" />
      {image ? (
        <TouchableOpacity
          style={styles.wrapperImagePicker}
          onPress={() => setImagePickerModal(true)}
        >
          <Image source={{ uri: image }} style={styles.imagePicked} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.wrapperImagePicker}
          onPress={() => setImagePickerModal(true)}
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
