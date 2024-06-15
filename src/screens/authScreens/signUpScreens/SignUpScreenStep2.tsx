import ScreenContainer from "@/components/ScreenContainer";
import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
import { setUserInfo } from "@/redux/Slices/signUpUserInfoSlice";
import { useAppDispatch } from "@/redux/hooks";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ScreenBackground from "../components/ScreenBackground";
import AuthBtn from "./components/AuthBtn";
import HeaderComponent from "./components/HeaderComponent";

interface FormProps {
  firstname: string;
  lastname: string;
}

export default function SignUpScreenStep2({ navigation }: { navigation: any }) {
  const dispatch = useAppDispatch();
  const input1Ref = useRef<TextInput>(null);
  const input2Ref = useRef<TextInput>(null);
  const input3Ref = useRef<TextInput>(null);
  const [userBirthDate, setuserBirthDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [textBirthdayWrong, setTextBirthdayWrong] = useState("");
  const [btnDisable, setBtnDisable] = useState(true);

  const changeIput = (inputRef: any) => {
    inputRef.current.focus();
  };
  const onSubmit = () => {
    const birthDate = `${userBirthDate.year}-${userBirthDate.month}-${userBirthDate.day}`;
    dispatch(setUserInfo({ birthDate }));
    navigation.navigate(ROUTES.SignUpScreenStep3);
  };

  //Day birtday handler
  const birthDateDayhandler = (birthDate: string) => {
    if (birthDate.length == 1) {
      const newBirthDate = { ...userBirthDate, day: 0 + birthDate };
      setuserBirthDate(newBirthDate);
    } else {
      const newBirthDate = { ...userBirthDate, day: birthDate };
      setuserBirthDate(newBirthDate);
    }
    if (birthDate.length == 2) {
      changeIput(input2Ref);
    }
  };
  //Month birtday handler
  const birthDateMonthhandler = (birthDate: string) => {
    if (birthDate.length == 1) {
      const newBirthDate = { ...userBirthDate, month: 0 + birthDate };
      setuserBirthDate(newBirthDate);
    } else {
      const newBirthDate = { ...userBirthDate, month: birthDate };
      setuserBirthDate(newBirthDate);
    }
    if (birthDate.length === 2) {
      changeIput(input3Ref);
    }
  };
  //Year birtday handler
  const birthDateYearhandler = (birthDate: string) => {
    const newBirthDate = { ...userBirthDate, year: birthDate };
    setuserBirthDate(newBirthDate);
  };

  useEffect(() => {
    //userBirtday Verification---------------------------------//
    const Birthdate = `${userBirthDate.year}-${userBirthDate.month}-${userBirthDate.day}`;

    const isValid =
      Birthdate &&
      parseInt(userBirthDate.month) > 0 &&
      parseInt(userBirthDate.month) < 13 &&
      parseInt(userBirthDate.day) > 0 &&
      parseInt(userBirthDate.day) < 32 &&
      parseInt(userBirthDate.year) > 1900 &&
      parseInt(userBirthDate.year) <= new Date().getFullYear();
    //---------------------------------------------------------//
    //User age -------------------------//
    function calculateAge(birthDate: string | Date) {
      // Convertir la date de naissance en objet Date si ce n'est pas déjà le cas
      birthDate = new Date(birthDate);

      // Obtenir la date actuelle
      const today = new Date();

      // Calculer l'âge
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();

      // Ajuster l'âge si l'anniversaire de cette année n'est pas encore passé
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age;
    }
    const age = calculateAge(
      `${userBirthDate.year}-${userBirthDate.month}-${userBirthDate.day}`
    );
    //Button condition-------------------//
    if (
      userBirthDate.day.length == 2 &&
      userBirthDate.month.length == 2 &&
      userBirthDate.year.length == 4
    ) {
      if (isValid) {
        if (age >= 18) {
          setBtnDisable(false);
        } else if (age < 18) {
          setBtnDisable(true);
          setTextBirthdayWrong("Tu dois avoir 18 ans pour t'inscrire");
        }
      } else {
        setTextBirthdayWrong("Ta date de naissance semble invalide");
        setBtnDisable(true);
      }
    } else {
      setTextBirthdayWrong("");
      setBtnDisable(true);
    }
  }, [userBirthDate]);

  // focus handler
  const focusHander = (textInput: string) => {
    if (textInput == "month") {
      if (userBirthDate.day == "") {
        if (input1Ref.current) input1Ref.current.focus();
      }
    }
    if (textInput == "year") {
      if (userBirthDate.day == "") {
        if (input1Ref.current) input1Ref.current.focus();
      } else if (userBirthDate.month == "") {
        if (input2Ref.current) input2Ref.current.focus();
      }
    }
  };
  return (
    <ScreenBackground>
      <ScreenContainer>
        <HeaderComponent title="Quel est ta date de naissance ?" />

        <View style={styles.inputContainer}>
          <TextInput
            ref={input1Ref}
            placeholder="JJ"
            style={styles.input}
            maxLength={2}
            onChangeText={birthDateDayhandler}
            cursorColor={"#000"}
            inputMode="numeric"
          />
          <TextInput
            ref={input2Ref}
            onFocus={() => focusHander("month")}
            onKeyPress={(event) => {
              if (
                event.nativeEvent.key == "Backspace" &&
                userBirthDate.month.length == 0
              ) {
                changeIput(input1Ref);
              }
            }}
            placeholder="MM"
            maxLength={2}
            style={styles.input}
            onChangeText={birthDateMonthhandler}
            cursorColor={"#000"}
            inputMode="numeric"
          />
          <TextInput
            ref={input3Ref}
            onFocus={() => focusHander("year")}
            onKeyPress={(event) => {
              if (
                event.nativeEvent.key == "Backspace" &&
                userBirthDate.year.length == 0
              ) {
                changeIput(input2Ref);
              }
            }}
            placeholder="AAAA"
            maxLength={4}
            style={styles.input}
            onChangeText={birthDateYearhandler}
            cursorColor={"#000"}
            inputMode="numeric"
          />
        </View>
        <Text style={styles.textBirthdayWrong}>{textBirthdayWrong}</Text>
        <AuthBtn title="Suivant" onPress={onSubmit} disabled={btnDisable} />
      </ScreenContainer>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#000",
    width: "30%",
    paddingVertical: 10,
    justifyContent: "center",
    textAlign: "center",
    fontFamily: FONTS.poppinsMedium,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  textBirthdayWrong: {
    color: "rgba(255, 0, 0, 0.7)",
    textAlign: "center",
    fontFamily: FONTS.poppinsMedium,
    fontSize: 12,
    marginTop: 5,
  },
});
