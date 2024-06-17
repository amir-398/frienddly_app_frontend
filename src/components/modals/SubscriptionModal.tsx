import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import ScreenBackground from "@/screens/authScreens/components/ScreenBackground";
import { Icon } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenContainer from "../ScreenContainer";

export default function SubscriptionModal() {
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setModalVisible(true);
    }, 5000);
  }, []);
  return (
    <Modal visible={modalVisible} statusBarTranslucent animationType="fade">
      <ScreenBackground>
        <ScreenContainer>
          <View style={styles.container}>
            <Text style={styles.title}>
              Profite de notre abonnement premium
            </Text>
            <Text style={styles.price}>5.99€/mois</Text>
            <View style={styles.wrapper}>
              <Icon
                name="checkmark-sharp"
                type="ionicon"
                color="#fff"
                style={styles.icon}
                size={30}
              />
              <Text style={styles.text}>Évènements exclusifs</Text>
            </View>
            <View style={styles.separator}></View>
            <View style={styles.wrapper}>
              <Icon
                name="checkmark-sharp"
                type="ionicon"
                color="#fff"
                style={styles.icon}
                size={30}
              />
              <Text style={styles.text}>-20 % sur les réservations</Text>
            </View>
            <View style={styles.separator}></View>
            <View style={styles.wrapper}>
              <Icon
                name="checkmark-sharp"
                type="ionicon"
                color="#fff"
                style={styles.icon}
                size={30}
              />
              <Text style={styles.text}>Pas de limitation de messages</Text>
            </View>
            <View style={styles.separator}></View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>S'abonner</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancel}>Continuer sans abonnement</Text>
            </TouchableOpacity>
          </View>
        </ScreenContainer>
      </ScreenBackground>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.poppinsBold,
    color: "#fff",

    textAlign: "center",
  },
  price: {
    fontSize: 40,
    fontFamily: FONTS.poppinsBold,
    marginVertical: 40,
    color: "#fff",

    textAlign: "center",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
  text: {
    fontSize: 16,
    fontFamily: FONTS.poppinsMedium,
    color: "#fff",
    marginTop: 5,
  },
  separator: {
    width: "90%",
    height: 1,
    backgroundColor: "#fff",
    marginVertical: 20,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: COLORS.primaryColor,
    borderColor: "#fff",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 30,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: FONTS.poppinsBold,
    color: "#fff",
  },
  cancel: {
    fontSize: 16,
    fontFamily: FONTS.poppinsMedium,
    color: "#fff",
    marginTop: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
