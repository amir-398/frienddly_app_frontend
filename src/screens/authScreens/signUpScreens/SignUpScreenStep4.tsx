import CustomInput from "@/components/CustomInput";
import ScreenContainer from "@/components/ScreenContainer";
import ROUTES from "@/constants/ROUTES";
import { setUserInfo } from "@/redux/Slices/signUpUserInfoSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Field, Formik } from "formik";
import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import AuthBtn from "./components/AuthBtn";
import HeaderComponent from "./components/HeaderComponent";

interface FormProps {
  password: string;
}
const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
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
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Les mots de passe doivent correspondre")
    .required("Champ requis"),
});

export default function SignUpScreenStep4({ navigation }: { navigation: any }) {
  const dispatch = useAppDispatch();

  const onSubmit = (values: FormProps) => {
    const password = values.password;
    dispatch(setUserInfo({ password }));
    navigation.navigate(ROUTES.SignUpScreenStep5);
  };

  return (
    <ScreenContainer>
      <HeaderComponent title="Indiquez votre adresse email?" />
      <Formik
        initialValues={{
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, isValid }) => (
          <>
            <Field
              name="password"
              component={CustomInput}
              placeholder="Mot de passe"
              inputStyle={{ marginBottom: 20 }}
              secureTextEntry={true}
            />
            <Field
              name="passwordConfirmation"
              component={CustomInput}
              placeholder="Confirmer le mot de passe"
              inputStyle={{ marginBottom: 20 }}
              secureTextEntry={true}
            />
            <AuthBtn
              title="Suivant"
              onPress={handleSubmit}
              disabled={!isValid}
            />
          </>
        )}
      </Formik>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({});
