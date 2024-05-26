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
    <View style={inputStyle}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            hasError && styles.errorInput,
            {
              paddingRight: secureTextEntry ? 60 : 35,
            },
          ]}
          value={value}
          onChangeText={(text) => onChange(name)(text)}
          placeholderTextColor={"rgba(0,0,0,0.5)"}
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
              { right: secureTextEntry ? 35 : 10 },
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
              padding={1}
            />
          </View>
        )}
      </View>
      <View style={styles.errorContainer}>
        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  textInput: {
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 10,
    width: "100%",
    fontSize: 14,
    fontFamily: FONTS.poppinsMedium,
    paddingLeft: 10,
  },
  errorInput: {
    borderColor: "rgba(255,0,0,0.8)",
  },
  errorContainer: {
    width: "100%",
    justifyContent: "center",
    height: 17,
  },
  errorText: {
    color: "rgba(255,0,0,0.8)",
    fontFamily: FONTS.poppinsMedium,
    fontSize: 12,
  },
  rightIconContainer: {
    position: "absolute",
    right: 10,
  },
});
