import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import { useSendGradeToPost } from "@/hooks/posts";
import { Icon } from "@rneui/themed";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Stars from "react-native-stars";
export default function AddGradeModal({
  postId,
  isVisible,
  setIsVisible,
  refetch,
}: {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  postId: number;
  refetch: () => void;
}) {
  const [grade, setGrade] = useState(3);
  // handle submit grade
  const { mutate: userSendGrade, isPending } = useSendGradeToPost();
  const handleSubmitGrade = () => {
    userSendGrade(
      { postId, grade },
      {
        onSuccess: () => {
          setIsVisible(false);
          refetch();
        },
        onError: (error) => {
          console.error("error", error);
          setIsVisible(false);
        },
      }
    );
  };
  return (
    <Modal transparent visible={isVisible}>
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" />
      <View style={styles.container}>
        <View style={styles.addGradeContainer}>
          <View>
            <Text style={styles.thankYouText}>
              Merci d'avoir laissé un commentaire !
            </Text>

            <Text style={styles.title}>ajoute une note</Text>
            <Stars
              default={3}
              count={5}
              update={(val: number) => {
                setGrade(val);
              }}
              fullStar={
                <Icon
                  name={"star"}
                  type="ionicon"
                  size={40}
                  color={COLORS.primaryColor}
                />
              }
              emptyStar={
                <Icon
                  name={"star-outline"}
                  type="ionicon"
                  color={COLORS.primaryColor}
                  size={40}
                />
              }
            />
          </View>
          <TouchableOpacity
            style={[styles.submitButton, { opacity: isPending ? 0.5 : 1 }]}
            onPress={handleSubmitGrade}
            disabled={isPending}
          >
            {!isPending && (
              <Text style={styles.submitButtonText}>Soumettre</Text>
            )}
            {isPending && <ActivityIndicator color="white" size={33} />}
          </TouchableOpacity>
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  addGradeContainer: {
    width: "80%",
    height: 280,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-between",
    position: "relative",
  },
  closeIconContainer: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  thankYouText: {
    fontSize: 18,
    fontFamily: FONTS.poppinsBold,
    marginBottom: 10,
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.poppinsMedium,
    marginVertical: 10,
    textAlign: "center",
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: COLORS.primaryColor,
    padding: 6,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: FONTS.poppinsBold,
    marginTop: 5,
    textAlign: "center",
  },
});
