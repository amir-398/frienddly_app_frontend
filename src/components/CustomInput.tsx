import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import InteractiveIcon from "./InteractiveIcon";
export default function CustomInput(props) {
  const {
    secureTextEntry,
    iconName,
    iconType,
    inputStyle,
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const [isSecureEntry, setIsSecureEntry] = useState(secureTextEntry);
  const hasError = errors[name] && touched[name];

  const handleClearInput = (name: string, onChange: any) => {
    onChange(name)("");
  };

  return (
    <>
      <View style={[styles.inputContainer, inputStyle]}>
        <TextInput
          style={[
            styles.textInput,
            hasError && styles.errorInput,
            {
              paddingRight: secureTextEntry && iconName && iconType ? 60 : 35,
            },
            { paddingLeft: iconName && iconType ? 30 : 10 },
          ]}
          value={value}
          onChangeText={(text) => onChange(name)(text)}
          placeholderTextColor={"#333333"}
          secureTextEntry={isSecureEntry}
          cursorColor={"#000"}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          {...inputProps}
        />
        {value && (
          <View
            style={[
              styles.rightIconContainer,
              { right: secureTextEntry ? 30 : 10 },
            ]}
          >
            <InteractiveIcon
              onPress={() => handleClearInput(name, onChange)}
              name="close"
              type="ionicon"
              size={20}
              padding={1}
              color="#000"
            />
          </View>
        )}
        {secureTextEntry && (
          <View style={styles.rightIconContainer}>
            <InteractiveIcon
              name={isSecureEntry ? "eye-off-sharp" : "eye-sharp"}
              type="ionicon"
              color="#000"
              onPress={() => setIsSecureEntry(!isSecureEntry)}
              size={20}
            />
          </View>
        )}
      </View>
      {hasError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errors[name]}</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderColor: COLORS.secondaryColor,
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 10,
    width: "100%",
    fontSize: 14,
    fontFamily: FONTS.poppinsMedium,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontFamily: FONTS.poppinsMedium,
    fontSize: 12,
    marginTop: -15,
    textAlign: "center",
  },
  rightIconContainer: {
    position: "absolute",
    right: 10,
  },
});
