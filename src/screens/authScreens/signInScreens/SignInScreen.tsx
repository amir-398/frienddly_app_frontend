import google_logo from "@/assets/images/logo-google.png";
import logo_image from "@/assets/logo/logo.png";
import CustomInput from "@/components/CustomInput";
import ScreenContainer from "@/components/ScreenContainer";
import SubmitBtn from "@/components/SubmitBtn";
import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import { useLogin } from "@/hooks/auth";
import { useTokenEffect } from "@/hooks/useTokenEffect";
import { Icon } from "@rneui/themed";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const validationSchema = Yup.object({
  email: Yup.string()
    .min(1)
    .max(50)
    .matches(emailRegex, "Email invalide")
    .email()
    .required("Champ requis")
    .trim()
    .lowercase(),
  password: Yup.string().required("Champ requis"),
});

interface FormValues {
  email: string;
  password: string;
}
export default function SignInScreen() {
  const { mutate: userLogin, isPending } = useLogin();
  const [error, setError] = useState(false);
  const { storeToken } = useTokenEffect();

  //onSubmit function to handle form submission
  const onSubmit = (values: FormValues) => {
    const email = values.email.trim().toLowerCase();
    const password = values.password;
    setError(false);
    userLogin(
      { email, password },
      {
        onSuccess: (data) => {
          const token = data.token.token;
          const streamToken = data.streamToken;
          storeToken(token, streamToken);
        },
        onError: (error) => {
          setError(true);
        },
      }
    );
  };
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Image source={logo_image} style={styles.logo} />
        <Text style={styles.title}>Content de te revoir</Text>
        <Text style={styles.subTitle}>
          Connectez-vous à votre compte Frienddly
        </Text>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isValid, dirty }) => (
            <View style={styles.fieldsContainer}>
              {error && (
                <View style={styles.errorMessageContainer}>
                  <Icon name="warning" type="ionicon" color={"red"} size={20} />

                  <Text style={styles.errorMessage}>
                    Email ou mot de passe incorrect
                  </Text>
                </View>
              )}
              <Field
                name="email"
                component={CustomInput}
                placeholder="Email"
                inputStyle={{ marginBottom: 5 }}
              />
              <Field
                name="password"
                component={CustomInput}
                placeholder="Confirmer le mot de passe"
                secureTextEntry={true}
              />
              <Text style={styles.passwordForgetText}>
                Mot de passe oublié ?{" "}
                <Text
                  style={{
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                  }}
                >
                  Réinitiliser votre mot de passe
                </Text>
              </Text>
              <SubmitBtn
                title="Se connecter"
                onPress={handleSubmit}
                disabled={!(isValid && dirty)}
                loading={isPending}
              />
            </View>
          )}
        </Formik>
        <View style={styles.separatorContainer}>
          <View style={styles.line}></View>
          <Text style={styles.separatorText}>Ou</Text>
          <View style={styles.line}></View>
        </View>
        <TouchableOpacity
          style={styles.googleBtn}
          onPress={() => console.log("google")}
        >
          <Image source={google_logo} style={{ width: 30, height: 30 }} />
          <Text style={styles.googleTextBtn}>Continuer avec Google</Text>
        </TouchableOpacity>
        <View style={styles.inscriptionTextContainer}>
          <Text style={styles.inscriptionText}>
            Vous n'avez pas encore de compte ?{" "}
          </Text>
          <Pressable>
            <Text
              style={[
                styles.inscriptionText,
                {
                  fontFamily: FONTS.poppinsBold,
                  textDecorationLine: "underline",
                },
              ]}
            >
              S'inscrire
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenContainer>
  );
}
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: height,
  },
  logo: {
    width: "60%",
    resizeMode: "contain",
  },
  title: {
    fontSize: 25,
    fontFamily: FONTS.poppinsBold,
    color: COLORS.secondaryColor,
  },
  subTitle: {
    fontSize: 15,
    fontFamily: FONTS.poppinsMedium,
  },
  errorMessageContainer: {
    flexDirection: "row",
    width: width - 40,
    marginBottom: 10,
  },
  errorMessage: {
    color: "red",
    fontFamily: FONTS.poppinsMedium,
    lineHeight: 26,
    fontSize: 12,
    marginLeft: 2,
    alignSelf: "flex-end",
  },
  fieldsContainer: {
    marginVertical: 20,
  },
  passwordForgetText: {
    fontSize: 12,
    fontFamily: FONTS.poppinsRegular,
    marginBottom: 20,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.primaryColor,
  },
  separatorText: {
    marginHorizontal: 10,
    color: COLORS.secondaryColor,
    fontFamily: FONTS.poppinsMedium,
  },
  googleBtn: {
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLORS.primaryColor,
    width: width - 40,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  googleTextBtn: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 15,
    marginLeft: 10,
  },
  inscriptionTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
  },
  inscriptionText: {
    fontFamily: FONTS.poppinsRegular,
  },
});
