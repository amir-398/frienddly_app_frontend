import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import { Icon } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InteractiveIcon from "../InteractiveIcon";
export default function ImagePickerComponent({
  isVisible,
  setIsVisible,
  setImage,
  setImageError,
}: {
  isVisible: boolean;
  setIsVisible: any;
  setImage: (value: any) => void;
  setImageError: (value: string) => void;
}) {
  const pickImage = async (isCamera: boolean) => {
    // No permissions request is necessary for launching the image library
    let result;
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 0.5,
    };

    try {
      if (isCamera) {
        result = await ImagePicker.launchImageLibraryAsync(options);
      } else {
        result = await ImagePicker.launchCameraAsync(options);
      }
      if (!result.canceled) {
        const resultData = result.assets[0];
        const imageSize = resultData.fileSize;
        const imageMimeType = resultData.mimeType;
        const imageExtension = imageMimeType?.split("/")[1];
        const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
        const maxFileSize = 1024 * 1024 * 20;
        if (
          imageSize &&
          allowedExtensions.includes(imageExtension ?? "") &&
          imageSize <= maxFileSize
        ) {
          setImageError("");
          setImage(resultData);
        } else if (imageSize && imageSize >= maxFileSize) {
          setImage(undefined);
          setImageError(
            "La taille de l'image ne doit pas dépasser 10 Mo. Veuillez choisir une image plus petite."
          );
        } else {
          setImage(undefined);
          setImageError(
            "Fichier non autorisé, veuillez sélectionner une image valide."
          );
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsVisible(false);
    }
  };

  return (
    <Modal
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
      transparent
    >
      <Pressable style={styles.container} onPress={() => setIsVisible(false)}>
        <View style={styles.pickerContainer}>
          <InteractiveIcon
            name="close"
            onPress={() => setIsVisible(false)}
            type="ionicon"
            color="#000"
            style={styles.closeIcon}
            padding={2}
          />
          <Text style={styles.title}>Ajouter une image de profil</Text>
          <View style={styles.wrapper}>
            <TouchableOpacity
              style={styles.pickContainer}
              onPress={() => pickImage(false)}
            >
              <Icon name="camera" type="font-awesome" />
              <Text>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pickContainer}
              onPress={() => pickImage(true)}
            >
              <Icon name="images" type="ionicon" />
              <Text>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  pickerContainer: {
    width: "80%",
    paddingVertical: 20,
    paddingTop: 25,
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 5,
  },
  closeIcon: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  title: {
    fontSize: 15,
    textAlign: "center",
    marginVertical: 10,
    fontFamily: FONTS.poppinsMedium,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  pickContainer: {
    alignItems: "center",
    borderColor: COLORS.secondaryColor,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    width: "40%",
  },
});
