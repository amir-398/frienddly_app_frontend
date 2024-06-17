import InteractiveIcon from "@/components/InteractiveIcon";
import ScreenContainer from "@/components/ScreenContainer";
import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
import { S3ENDPOINTUSERIMAGES } from "@/constants/S3Endpoint";
import { useAppSelector } from "@/redux/hooks";
import { Icon } from "@rneui/themed";
import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Settings({ navigation }: { navigation: any }) {
  const userData = useAppSelector((state) => state.authSlice.userData);

  const listItems = [
    {
      title: "Favoris",
      icon: <Icon name="heart" type="ionicon" />,
    },
    {
      title: "Restaurants",
      icon: <Icon name="restaurant" />,
    },
    {
      title: "Soirées",
      icon: <Icon name="party-popper" type="material-community" />,
    },
    {
      title: "Abonnements & payements",
      icon: <Icon name="credit-card" />,
    },
    {
      title: "Accessibilité",
      icon: <Icon name="accessibility" />,
    },
    {
      title: "Changer le mot de passe",
      icon: <Icon name="password" />,
      onPress: () => navigation.navigate(ROUTES.ChangePassword),
    },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenContainer>
        <View style={styles.container}>
          <View style={styles.header}>
            <InteractiveIcon
              name="arrow-back"
              type="ionicon"
              size={30}
              padding={5}
              onPress={() => navigation.goBack()}
              color="#000"
            />
            <Image
              source={{ uri: S3ENDPOINTUSERIMAGES + userData?.profilImage }}
              style={styles.profilePicture}
            />
            <Text style={styles.headerText}>
              {userData?.lastname + " " + userData?.firstname}
            </Text>
          </View>

          {listItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.listItem}
              onPress={item.onPress}
            >
              {item.icon}
              <Text style={styles.itemText}>{item.title} </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.bottom}>
            <Icon name="settings" />
            <Text style={styles.bottomText}>Paramètres</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginLeft: 10,
  },
  headerText: {
    marginLeft: 10,
    fontSize: 20,
    fontFamily: FONTS.poppinsMedium,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 20,
  },
  itemText: {
    marginLeft: 15,
    fontFamily: FONTS.poppinsMedium,
    marginTop: 2,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 15,
  },
  bottomText: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 16,
    marginTop: 2,
    marginLeft: 10,
  },
});
