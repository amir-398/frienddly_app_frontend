import InteractiveIcon from "@/components/InteractiveIcon";
import ScreenContainer from "@/components/ScreenContainer";
import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
import { S3ENDPOINTUSERIMAGES } from "@/constants/S3Endpoint";
import { useSendFriendRequest } from "@/hooks/friends";
import { useGetProfilUser } from "@/hooks/userData";
import { setUserInvitedFriend } from "@/redux/Slices/userInvitedFriends";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { decodeText } from "@/utils/decodes/decodeText";
import { calculateAge } from "@/utils/userUtils/CalculateAge";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenBackground from "../authScreens/components/ScreenBackground";

export default function ProfilScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const dispatch = useAppDispatch();
  const userId = route.params?.userId;
  const userData = useAppSelector((state) => state.authSlice.userData);
  const sendedInvitations = useAppSelector(
    (state) => state.userInvitedFriends.usersId
  );

  const { mutate: sendFriendRequest } = useSendFriendRequest();

  const handleSendFriendRequest = async () => {
    try {
      sendFriendRequest(userId, {
        onSuccess: () => {
          dispatch(setUserInvitedFriend(userId));
        },
        onError: (error) => {
          console.log("error", error);
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  let userInfo;

  if (userId) {
    const { data: userProfilInfo } = useGetProfilUser(userId);
    userInfo = userProfilInfo;
  } else {
    userInfo = userData;
  }

  if (!userInfo) {
    return (
      <ActivityIndicator
        size="large"
        color={COLORS.primaryColor}
        style={{ alignSelf: "center", marginTop: 40 }}
      />
    );
  }
  const userIsInvited =
    (userId && sendedInvitations.includes(userId)) ||
    userInfo.friendShipStatus == "pending" ||
    userInfo.friendShipStatus == "rejected";

  const userIsFriend = userInfo?.friendShipStatus == "accepted";

  const profilImage = userInfo?.profilImage;
  const firstname = decodeText(userInfo?.firstname);
  const lastname = decodeText(userInfo?.lastname);
  const age = calculateAge(userInfo?.birthDate);
  const bio = userInfo?.description
    ? decodeText(userInfo?.description)
    : "Bio pas encore renseignée";
  const cityOfBirth = userInfo?.cityOfBirth
    ? decodeText(userInfo?.cityOfBirth)
    : "Pas encore renseigné";
  const iLike = userInfo?.iLike
    ? decodeText(userInfo?.iLike)
    : "Pas encore renseigné";
  const favoriteShows = userInfo?.favoriteShows
    ? decodeText(userInfo?.favoriteShows)
    : "Pas encore renseigné";
  const centerOfInterest = userInfo?.centerOfInterest
    ? decodeText(userInfo?.centerOfInterest)
    : "Pas encore renseigné";
  const astrologicalSign = userInfo?.astrologicalSign
    ? decodeText(userInfo?.astrologicalSign)
    : "Pas encore renseigné";
  const favoriteArtists = userInfo?.favoriteArtists
    ? decodeText(userInfo?.favoriteArtists)
    : "Pas encore renseigné";
  const activity = userInfo?.activity
    ? decodeText(userInfo?.activity)
    : "Pas encore renseigné";
  const dreamCity = userInfo?.dreamCity
    ? decodeText(userInfo?.dreamCity)
    : "Pas encore renseigné";
  return (
    <View style={{ flex: 1 }}>
      <ScreenBackground>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <ScreenContainer>
            {userData.id == userInfo.id ? (
              <Pressable
                style={styles.iconSettingsContainer}
                onPress={() => navigation.navigate(ROUTES.Settings)}
              >
                <InteractiveIcon
                  name="settings-outline"
                  type="ionicon"
                  size={24}
                  color="#000"
                  onPress={() => navigation.navigate(ROUTES.Settings)}
                />
              </Pressable>
            ) : (
              <View style={{ height: 30 }}></View>
            )}
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
                {userData.id == userInfo.id && (
                  <TouchableOpacity
                    style={styles.headerBtn}
                    onPress={() =>
                      navigation.navigate(ROUTES.EditProfilData, { userInfo })
                    }
                  >
                    <Text style={styles.headerBtnText}>Modifier le profil</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {userData.id !== userInfo.id && (
              <View style={styles.btnsContainer}>
                <TouchableOpacity
                  style={[
                    styles.inviteBtn,
                    {
                      backgroundColor:
                        userIsInvited || userIsFriend
                          ? "grey"
                          : COLORS.secondaryColor,
                    },
                  ]}
                  onPress={handleSendFriendRequest}
                  disabled={userIsInvited || userIsFriend}
                >
                  <Text style={styles.inviteBtnText}>
                    {!userIsFriend && userIsInvited
                      ? "Invitation envoyée"
                      : !userIsFriend && !userIsInvited
                      ? "Inviter"
                      : ""}
                    {userIsFriend ? "Ami" : ""}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sendMessageBtn}>
                  <Text style={styles.sendMessageBtnText}>
                    Envoyer un message{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <Text style={styles.bioText}>{bio}</Text>

            <Text style={styles.dataTitle}>Qui suis-je vraiment</Text>
            <View style={styles.dataContainer}>
              <View style={styles.dataTopContainer}>
                <Text style={styles.dataText}>
                  <Text style={{ fontFamily: FONTS.poppinsBold }}>
                    Je suis né à :
                  </Text>{" "}
                  {cityOfBirth}
                </Text>
              </View>
              <View style={styles.dataBottomContainer}>
                <Text style={styles.dataText}>
                  <Text style={{ fontFamily: FONTS.poppinsBold }}>
                    J'adore :
                  </Text>{" "}
                  {iLike}
                </Text>
              </View>
            </View>
            <View style={styles.dataContainer}>
              <View style={styles.dataTopContainer}>
                <Text style={styles.dataText}>
                  <Text style={{ fontFamily: FONTS.poppinsBold }}>
                    Film / série préféré.e :
                  </Text>{" "}
                  {favoriteShows}
                </Text>
              </View>
              <View style={styles.dataBottomContainer}>
                <Text style={styles.dataText}>
                  <Text style={{ fontFamily: FONTS.poppinsBold }}>
                    Mes centres d’intérêts :
                  </Text>{" "}
                  {centerOfInterest}
                </Text>
              </View>
            </View>
            <View style={styles.dataContainer}>
              <View style={styles.dataTopContainer}>
                <Text style={styles.dataText}>
                  <Text style={{ fontFamily: FONTS.poppinsBold }}>
                    Signe astrologique :
                  </Text>{" "}
                  {astrologicalSign}
                </Text>
              </View>
              <View style={styles.dataBottomContainer}>
                <Text style={styles.dataText}>
                  <Text style={{ fontFamily: FONTS.poppinsBold }}>
                    Mon artiste préféré :
                  </Text>{" "}
                  {favoriteArtists}
                </Text>
              </View>
            </View>
            <View style={styles.dataContainer}>
              <View style={styles.dataTopContainer}>
                <Text style={styles.dataText}>
                  <Text style={{ fontFamily: FONTS.poppinsBold }}>
                    Mon activité / Mes études :
                  </Text>{" "}
                  {activity}
                </Text>
              </View>
              <View style={styles.dataBottomContainer}>
                <Text style={styles.dataText}>
                  <Text style={{ fontFamily: FONTS.poppinsBold }}>
                    Ma ville de rêve :
                  </Text>{" "}
                  {dreamCity}
                </Text>
              </View>
            </View>
          </ScreenContainer>
        </ScrollView>
      </ScreenBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
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
    marginLeft: 15,
  },
  headerText: {
    fontFamily: FONTS.poppinsBold,
  },
  headerBtn: {
    backgroundColor: COLORS.secondaryColor,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 5,
    marginTop: 5,
    borderColor: "#fff",
    borderWidth: 1,
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
    marginTop: 15,
  },
  inviteBtn: {
    backgroundColor: COLORS.secondaryColor,
    borderRadius: 20,
    width: 130,
    paddingVertical: 5,
  },
  inviteBtnText: {
    color: "#fff",
    fontFamily: FONTS.poppinsMedium,
    textAlign: "center",
    fontSize: 12,
    marginTop: 2,
  },
  sendMessageBtn: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  sendMessageBtnText: {
    color: "#fff",
    fontFamily: FONTS.poppinsMedium,
    fontSize: 13,
    marginTop: 2,
  },
  dataTitle: {
    fontFamily: FONTS.poppinsBold,
    fontSize: 16,
    marginBottom: 10,
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
