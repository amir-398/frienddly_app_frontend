import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import { useTokenEffect } from "@/hooks/useTokenEffect";
import { useDeleteUserData } from "@/hooks/userData";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ConfimDeleteAccountModal({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) {
  const { mutate: deleteUser, isSuccess, isPending } = useDeleteUserData();
  const { removeToken } = useTokenEffect();
  const handleDelete = async () => {
    try {
      deleteUser().then(() => {
        removeToken();
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      removeToken();
    }
  }, [isSuccess]);
  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>
            Confirmer la suppression de votre compte
          </Text>
          <Text style={styles.text}>
            Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
            irréversible.
          </Text>
          <View style={styles.btnWrapper}>
            <TouchableOpacity
              style={[
                styles.deleteBtn,
                { backgroundColor: isPending ? "grey" : COLORS.primaryColor },
              ]}
              onPress={handleDelete}
            >
              {isPending ? (
                <ActivityIndicator color={"#fff"} size={25} />
              ) : (
                <Text style={styles.deleteBtnText}>Supprimer</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.deleteBtnText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.poppinsBold,
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    marginBottom: 20,
    fontFamily: FONTS.poppinsMedium,
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteBtn: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: COLORS.primaryColor,
  },
  deleteBtnText: {
    color: "white",
    fontFamily: FONTS.poppinsBold,
  },
  cancelBtn: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: COLORS.secondaryColor,
  },
});
