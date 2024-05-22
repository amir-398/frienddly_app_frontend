import CustomInput from "@/components/CustomInput";
import ScreenContainer from "@/components/ScreenContainer";
import { setUserInfo } from "@/redux/Slices/userInfoSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Field, Formik } from "formik";
import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import AuthBtn from "./components/AuthBtn";
import HeaderComponent from "./components/HeaderComponent";

interface FormProps {
  firstname: string;
  lastname: string;
}

const validationSchema = Yup.object().shape({
  firstname: Yup.string().min(1).max(50),
  lastname: Yup.string().min(1).max(50),
});

export default function SignUpScreenStep1() {
  const dispatch = useAppDispatch();

  const onSubmit = (values: FormProps) => {
    const firstname = values.firstname;
    const lastname = values.lastname;
    dispatch(setUserInfo({ firstname, lastname }));
  };

  return (
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
        {({ handleSubmit, isValid }) => (
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
            <AuthBtn title="Suivant" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({});
