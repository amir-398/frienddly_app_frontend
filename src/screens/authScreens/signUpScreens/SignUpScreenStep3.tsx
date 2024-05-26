import CustomInput from "@/components/CustomInput";
import ScreenContainer from "@/components/ScreenContainer";
import ROUTES from "@/constants/ROUTES";
import { useVerifyEmail } from "@/hooks/auth";
import { setUserInfo } from "@/redux/Slices/signUpUserInfoSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Field, Formik, FormikHelpers } from "formik";
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
    .email()
    .required("Champ requis")
    .trim(),
});

export default function SignUpScreenStep3({ navigation }: { navigation: any }) {
  const dispatch = useAppDispatch();

  const { mutate: verifyEmail, isPending: VerifyEmailPending } =
    useVerifyEmail();

  // onSubmit function to handle form submission
  const onSubmit = async (
    values: FormProps,
    { setFieldError }: FormikHelpers<FormProps>
  ) => {
    const email = values.email.trim().toLowerCase();
    verifyEmail(email, {
      onSuccess: (isEmailExist) => {
        if (isEmailExist) {
          setFieldError("email", "Cet email est déjà utilisé");
        } else {
          dispatch(setUserInfo({ email }));
          navigation.navigate(ROUTES.SignUpScreenStep4);
        }
      },
      onError: () => {
        setFieldError("email", "Une erreur s'est produite");
      },
    });
  };

  return (
    <ScreenContainer>
      <HeaderComponent title="Indiquez votre adresse email" />
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, isValid, dirty }) => (
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
              disabled={!(isValid && dirty)}
              loading={VerifyEmailPending}
            />
          </>
        )}
      </Formik>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({});
