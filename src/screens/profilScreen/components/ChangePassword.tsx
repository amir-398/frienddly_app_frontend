import CustomInput from "@/components/CustomInput";
import InteractiveIcon from "@/components/InteractiveIcon";
import ScreenContainer from "@/components/ScreenContainer";
import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import { useTokenEffect } from "@/hooks/useTokenEffect";
import { useUpdatePassword } from "@/hooks/userData";
import { setBottomBarIsVisible } from "@/redux/Slices/bottomBarIsVisible";
import { useAppDispatch } from "@/redux/hooks";
import ScreenBackground from "@/screens/authScreens/components/ScreenBackground";
import AuthBtn from "@/screens/authScreens/signUpScreens/components/AuthBtn";
import { Field, Formik } from "formik";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Ce champ est requis"),
  newPassword: Yup.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(50, "Le mot de passe doit contenir au maximum 50 caractères")
    .matches(
      /[a-z]/,
      "Le mot de passe doit avoir au moins une lettre minuscule"
    )
    .matches(
      /[A-Z]/,
      "Le mot de passe doit avoir au moins une lettre majuscule"
    )
    .matches(
      /[^a-zA-Z0-9]/,
      "Le mot de passe doit avoir au moins un caractère spécial"
    )
    .required("Champ requis"),
  confirmNewPassword: Yup.string()
    .required("Ce champ est requis")
    .oneOf([Yup.ref("newPassword")], "Les mots de passe doivent correspondre"),
});

export default function ChangePassword({ navigation }: { navigation: any }) {
  const dispatch = useAppDispatch();
  const { mutate: updatePassword, isPending } = useUpdatePassword();
  const { removeToken } = useTokenEffect();
  // Hide bottom bar on first render
  useEffect(() => {
    dispatch(setBottomBarIsVisible(false));
    return () => {
      dispatch(setBottomBarIsVisible(true));
    };
  }, []);

  const handleSubmit = (values: {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    const oldPassword = values.oldPassword;
    const newPassword = values.newPassword;

    updatePassword(
      { oldPassword, newPassword },
      {
        onSuccess: () => {
          removeToken();
        },
        onError: (error) => {
          if (error.message == "Invalid old password") {
            alert("Ancien mot de passe incorrect");
          }
        },
      }
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenBackground>
        <ScreenContainer>
          <View style={styles.header}>
            <InteractiveIcon
              name="arrow-back"
              type="ionicon"
              color="#000"
              padding={5}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.title}>Changer votre mot de passe</Text>
          </View>
          <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
              confirmNewPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, isValid, dirty }) => (
              <>
                <View style={styles.wrapper}>
                  <Field
                    name="oldPassword"
                    component={CustomInput}
                    placeholder="Ancien mot de passe"
                    inputStyle={{ marginBottom: 20 }}
                    secureTextEntry={true}
                  />
                  <Field
                    name="newPassword"
                    component={CustomInput}
                    placeholder="Nouveau mot de passe"
                    inputStyle={{ marginBottom: 20 }}
                    secureTextEntry={true}
                  />
                  <Field
                    name="confirmNewPassword"
                    component={CustomInput}
                    placeholder="Confirmer le mot de passe"
                    inputStyle={{ marginBottom: 20 }}
                    secureTextEntry={true}
                  />
                </View>
                <AuthBtn
                  title="Valider"
                  onPress={handleSubmit}
                  disabled={!(isValid && dirty)}
                  loading={isPending}
                />
              </>
            )}
          </Formik>
        </ScreenContainer>
      </ScreenBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 50,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.poppinsBold,
    textAlign: "center",
    color: "#000",
    marginLeft: 10,
  },
  wrapper: {
    borderColor: COLORS.primaryColor,
    borderWidth: 2,
    borderRadius: 10,
    paddingTop: 30,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});
