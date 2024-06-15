import CustomInput from "@/components/CustomInput";
import ScreenContainer from "@/components/ScreenContainer";
import ROUTES from "@/constants/ROUTES";
import { setUserInfo } from "@/redux/Slices/signUpUserInfoSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Field, Formik } from "formik";
import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import ScreenBackground from "../components/ScreenBackground";
import AuthBtn from "./components/AuthBtn";
import HeaderComponent from "./components/HeaderComponent";

interface FormProps {
  firstname: string;
  lastname: string;
}

const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, "Minimum 3 caractères")
    .max(50, "Maximum 50 caractères")
    .matches(/^[a-zA-Z\sé]+$/, "Seulement des lettres")
    .required("Champ requis")
    .trim(),
  lastname: Yup.string()
    .min(3, "Minimum 3 caractères")
    .max(50, "Maximum 50 caractères")
    .matches(/^[a-zA-Z\sé]+$/, "Seulement des lettres")
    .required("Champ requis")
    .trim(),
});

export default function SignUpScreenStep1({ navigation }: { navigation: any }) {
  const dispatch = useAppDispatch();
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  const onSubmit = (values: FormProps) => {
    const firstname = capitalizeFirstLetter(values.firstname.trim());
    const lastname = capitalizeFirstLetter(values.lastname.trim());
    dispatch(setUserInfo({ firstname, lastname }));
    navigation.navigate(ROUTES.SignUpScreenStep2);
  };

  return (
    <ScreenBackground>
      <ScreenContainer>
        <HeaderComponent title="Quel est ton nom et prénom ?" />
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isValid, dirty }) => (
            <>
              <Field
                name="lastname"
                component={CustomInput}
                placeholder="Ton nom"
                inputStyle={{ marginBottom: 20 }}
              />
              <Field
                name="firstname"
                component={CustomInput}
                placeholder="Ton prénom"
              />
              <AuthBtn
                title="Suivant"
                onPress={handleSubmit}
                disabled={!(isValid && dirty)}
              />
            </>
          )}
        </Formik>
      </ScreenContainer>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({});
