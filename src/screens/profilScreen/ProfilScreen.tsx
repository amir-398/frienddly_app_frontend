import ScreenContainer from "@/components/ScreenContainer";
import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
import { S3ENDPOINTUSERIMAGES } from "@/constants/S3Endpoint";
import { useAppSelector } from "@/redux/hooks";
import { calculateAge } from "@/utils/userUtils/CalculateAge";
import { Icon } from "@rneui/themed";
import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfilScreen({ navigation }: { navigation: any }) {
  const userData = useAppSelector((state) => state.authSlice.userData);
  const userInfo = userData;
  const profilImage = userInfo?.profilImage;
  const firstname = userInfo?.firstname;
  const lastname = userInfo?.lastname;
  const age = calculateAge(userInfo?.birthDate);
  const bio = userInfo?.description;
  const cityOfBirth = userInfo?.cityOfBirth;
  const Ilike = userInfo?.Ilike;
  const favoriteShows = userInfo?.favoriteShows;
  const centreOfInterest = userInfo?.centreOfInterest;
  const astrologicalSign = userInfo?.astrologicalSign;
  const favoriteArtists = userInfo?.favoriteArtists;
  const activity = userInfo?.activity;
  const dreamCity = userInfo?.dreamCity;
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={"#DEDEDE"} />
      <ScreenContainer>
        <View style={styles.iconSettingsContainer}>
          <Icon name="settings-outline" type="ionicon" size={24} />
        </View>
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: S3ENDPOINTUSERIMAGES + profilImage }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <View style={styles.headerRight}>
            <Text style={styles.headerText}>
              {firstname} {lastname}
            </Text>
            <Text style={styles.headerText}>{age} ans</Text>
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() =>
                navigation.navigate(ROUTES.EditProfilData, { userInfo })
              }
            >
              <Text style={styles.headerBtnText}>Modifier le profil</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.bioText}>
          {bio == null
            ? "Veuillez ajouter une bio à votre profil"
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem modi nihil velit ullam unde minima iusto"}
        </Text>
        <View style={styles.btnsContainer}>
          <TouchableOpacity style={styles.inviteBtn}>
            <Text style={styles.inviteBtnText}>Inviter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendMessageBtn}>
            <Text style={styles.sendMessageBtnText}>Envoyer un message </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.dataTitle}>Qui suis-je vraiment</Text>
        <View style={styles.dataContainer}>
          <View style={styles.dataTopContainer}>
            <Text style={styles.dataText}>
              <Text style={{ fontFamily: FONTS.poppinsBold }}>
                Je suis née à :
              </Text>{" "}
              {cityOfBirth != null ? cityOfBirth : "Pas encore renseigné"}{" "}
            </Text>
          </View>
          <View style={styles.dataBottomContainer}>
            <Text style={styles.dataText}>
              <Text style={{ fontFamily: FONTS.poppinsBold }}>J'adore :</Text>{" "}
              {Ilike != null ? Ilike : "Pas encore renseigné"}{" "}
            </Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.dataTopContainer}>
            <Text style={styles.dataText}>
              <Text style={{ fontFamily: FONTS.poppinsBold }}>
                Film série préféré :
              </Text>{" "}
              {favoriteShows != null ? favoriteShows : "Pas encore renseigné"}{" "}
            </Text>
          </View>
          <View style={styles.dataBottomContainer}>
            <Text style={styles.dataText}>
              <Text style={{ fontFamily: FONTS.poppinsBold }}>
                Mes centres d’intérêts :
              </Text>{" "}
              {centreOfInterest != null
                ? centreOfInterest
                : "Pas encore renseigné"}{" "}
            </Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.dataTopContainer}>
            <Text style={styles.dataText}>
              <Text style={{ fontFamily: FONTS.poppinsBold }}>
                Signe astrologique :
              </Text>{" "}
              {astrologicalSign != null
                ? astrologicalSign
                : "Pas encore renseigné"}{" "}
            </Text>
          </View>
          <View style={styles.dataBottomContainer}>
            <Text style={styles.dataText}>
              <Text style={{ fontFamily: FONTS.poppinsBold }}>
                Mon artiste préféré :
              </Text>{" "}
              {favoriteArtists != null
                ? favoriteArtists
                : "Pas encore renseigné"}{" "}
            </Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.dataTopContainer}>
            <Text style={styles.dataText}>
              <Text style={{ fontFamily: FONTS.poppinsBold }}>
                Mon activité / Mes études :
              </Text>{" "}
              {activity != null ? activity : "Pas encore renseigné"}{" "}
            </Text>
          </View>
          <View style={styles.dataBottomContainer}>
            <Text style={styles.dataText}>
              <Text style={{ fontFamily: FONTS.poppinsBold }}>
                Ma ville de rêve :
              </Text>{" "}
              {dreamCity != null ? dreamCity : "Pas encore renseigné"}{" "}
            </Text>
          </View>
        </View>
      </ScreenContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DEDEDE",
  },
  iconSettingsContainer: {
    alignItems: "flex-end",
    margin: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    marginLeft: 10,
  },
  headerText: {
    fontFamily: FONTS.poppinsBold,
  },
  headerBtn: {
    backgroundColor: COLORS.secondaryColor,
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 5,
    marginTop: 5,
  },
  headerBtnText: {
    color: "#fff",
    fontFamily: FONTS.poppinsMedium,
    marginTop: 2,
  },
  bioText: {
    fontFamily: FONTS.poppinsMedium,
    marginVertical: 20,
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inviteBtn: {
    backgroundColor: COLORS.secondaryColor,
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  inviteBtnText: {
    color: "#fff",
    fontFamily: FONTS.poppinsMedium,
  },
  sendMessageBtn: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  sendMessageBtnText: {
    color: "#fff",
    fontFamily: FONTS.poppinsMedium,
  },
  dataTitle: {
    fontFamily: FONTS.poppinsBold,
    fontSize: 16,
    marginVertical: 15,
  },
  dataContainer: {
    marginBottom: 10,
  },
  dataTopContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    borderBottomColor: "#DEDEDE",
    borderBottomWidth: 1,
  },
  dataBottomContainer: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
  },
  dataText: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 13,
  },
});
