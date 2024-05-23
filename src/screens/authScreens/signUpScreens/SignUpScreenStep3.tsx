import CustomInput from "@/components/CustomInput";
import ScreenContainer from "@/components/ScreenContainer";
import ROUTES from "@/constants/ROUTES";
import { setUserInfo } from "@/redux/Slices/userInfoSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Field, Formik } from "formik";
import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import AuthBtn from "./components/AuthBtn";
import HeaderComponent from "./components/HeaderComponent";

interface FormProps {
  email: string;
}
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .min(1)
    .max(50)
    .matches(emailRegex, "Email invalide")
    .required("Champ requis")
    .trim(),
});

export default function SignUpScreenStep3({ navigation }: { navigation: any }) {
  const dispatch = useAppDispatch();

  const onSubmit = (values: FormProps) => {
    const email = values.email.trim();
    dispatch(setUserInfo({ email }));
    navigation.navigate(ROUTES.SignUpScreenStep4);
  };

  return (
    <ScreenContainer>
      <HeaderComponent title="Indiquez votre adresse email?" />
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, isValid }) => (
          <>
            <Field
              name="email"
              component={CustomInput}
              placeholder="Ton e-email"
              inputStyle={{ marginBottom: 20 }}
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
