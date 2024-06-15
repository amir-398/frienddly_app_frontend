import logo_image from "@/assets/logo/logo.png";
import CustomInput from "@/components/CustomInput";
import ScreenContainer from "@/components/ScreenContainer";
import SubmitBtn from "@/components/SubmitBtn";
import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
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
  View,
} from "react-native";
import * as Yup from "yup";
import ScreenBackground from "../components/ScreenBackground";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const validationSchema = Yup.object({
  email: Yup.string()
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
export default function SignInScreen({ navigation }: { navigation: any }) {
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
    <ScreenBackground>
      <ScreenContainer>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={logo_image} style={styles.logo} />
          </View>
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
                    <Icon
                      name="warning"
                      type="ionicon"
                      color={"red"}
                      size={20}
                    />
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

          <View style={styles.inscriptionTextContainer}>
            <Text style={styles.inscriptionText}>
              Vous n'avez pas encore de compte ?{" "}
            </Text>
            <Pressable
              onPress={() => navigation.navigate(ROUTES.SignUpScreenStep1)}
            >
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
    </ScreenBackground>
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
  logoContainer: {
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    width: 300,
    height: 100,
    marginBottom: 50,
  },
  logo: {
    width: "80%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  title: {
    fontSize: 25,
    fontFamily: FONTS.poppinsBold,
    color: "#000",
  },
  subTitle: {
    fontSize: 15,
    fontFamily: FONTS.poppinsMedium,
    textAlign: "center",
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
    backgroundColor: "#000",
  },
  separatorText: {
    marginHorizontal: 10,
    color: "#000",
    fontFamily: FONTS.poppinsMedium,
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
