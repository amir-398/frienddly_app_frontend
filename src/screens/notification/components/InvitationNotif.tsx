import logo from "@/assets/logo/logo_2.png";
import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import {
  useAcceptFriendRequestNotification,
  useRefuseFriendRequestNotification,
} from "@/hooks/friends";
import { DateTime } from "luxon";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function InvitationNotif({ item }: { item: any }) {
  const senderUsername = item?.friendship.senderData.lastname;
  const senderFirstname = item?.friendship.senderData.firstname;
  const senderProfileImage = item?.friendship.senderData.profilImage;
  const senderName = `${senderFirstname} ${senderUsername}`;
  // function to format the date
  const formatNotificationDate = (dateStr: string) => {
    const now = DateTime.now();
    const date = DateTime.fromISO(dateStr);
    const diffInMinutes = now.diff(date, "minutes").toObject().minutes ?? 0;
    const diffInHours = now.diff(date, "hours").toObject().hours ?? 0;
    const diffInDays = now.diff(date, "days").toObject().days ?? 0;
    if (diffInMinutes < 1) {
      return "à l'instant";
    } else if (diffInMinutes < 60) {
      return `${Math.round(diffInMinutes)}m`;
    } else if (diffInHours < 24) {
      return `${Math.round(diffInHours)}h`;
    } else if (diffInDays < 7) {
      return `${Math.round(diffInDays)}j`;
    } else {
      return date.toFormat("dd LLL");
    }
  };
  const notificationDate = formatNotificationDate(item.createdAt);

  // accept friend request
  const {
    mutate: acceptFriendRequest,
    error,
    isSuccess,
  } = useAcceptFriendRequestNotification();
  if (isSuccess) {
    console.log("success");
  }
  if (error) {
    console.log("error", error);
  }

  // refuse friend request
  const { mutate: refuseFriendRequest } = useRefuseFriendRequestNotification();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.left}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.headerText}>FRIENDDLY</Text>
        </View>
        <Text style={styles.notifTime}>{notificationDate} </Text>
      </View>
      <View>
        <Text style={styles.mainTitle}>Invitation</Text>
        <View style={styles.mainWrapper}>
          <View style={styles.leftWrapper}>
            <Text style={styles.mainText}>
              Vous avez reçu une invitation de la part de{" "}
              <Text style={styles.inviter}>{senderName}</Text>
            </Text>
            <View style={styles.btnsContainer}>
              <TouchableOpacity
                style={styles.acceptBtn}
                onPress={() => acceptFriendRequest(item.friendship.id)}
              >
                <Text style={styles.btnText}>Accepter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.refuseBtn}
                onPress={() => refuseFriendRequest(item.friendship.id)}
              >
                <Text style={styles.btnText}>Refuser</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Image
            source={{ uri: senderProfileImage }}
            style={styles.profilImage}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: COLORS.primaryColor,
    paddingVertical: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 20,
    height: 20,
  },
  headerText: {
    fontSize: 15,
    fontFamily: FONTS.poppinsRegular,
    marginLeft: 5,
    marginTop: 2,
    color: "rgba(0,0,0,0.7)",
  },
  notifTime: {
    fontSize: 12,
    fontFamily: FONTS.poppinsRegular,
    marginLeft: 5,
    marginTop: 2,
    color: "rgba(0,0,0,0.7)",
  },
  mainTitle: {
    fontFamily: FONTS.poppinsBold,
    fontSize: 16,
    marginTop: 5,
  },
  mainWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftWrapper: {
    width: "80%",
  },
  mainText: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 14,
  },
  inviter: {
    fontFamily: FONTS.poppinsBold,
  },
  btnsContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
  },
  acceptBtn: {
    backgroundColor: COLORS.secondaryColor,
    padding: 5,
    borderRadius: 2,
    paddingHorizontal: 10,
  },
  refuseBtn: {
    backgroundColor: COLORS.primaryColor,
    padding: 5,
    borderRadius: 2,
    paddingHorizontal: 10,
  },
  btnText: {
    fontFamily: FONTS.poppinsMedium,
    marginTop: 2,
  },
  profilImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
});
