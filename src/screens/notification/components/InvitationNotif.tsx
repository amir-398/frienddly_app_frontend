import logo from "@/assets/logo/logo_2.png";
import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import { NotificationProps } from "@/enums/notification";
import {
  useAcceptFriendRequestNotification,
  useRefuseFriendRequestNotification,
} from "@/hooks/friends";
import { formatNotificationDate } from "@/utils/notificationsUtils/formatNotificationDate";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function InvitationNotif({
  item,
  setNotifications,
}: {
  item: NotificationProps;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationProps[]>>;
}) {
  const senderUsername = item?.friendship.senderData.lastname;
  const senderFirstname = item?.friendship.senderData.firstname;
  const senderProfileImage = item?.friendship.senderData.profilImage;
  const senderName = `${senderFirstname} ${senderUsername}`;

  const friendshipStatus = item.friendship.status;
  const notificationDate = formatNotificationDate(item.createdAt);

  // accept friend request
  const {
    mutate: acceptFriendRequest,
    error,
    isSuccess,
  } = useAcceptFriendRequestNotification();

  const accepteFriendRequest = (friendshipId: number) => {
    acceptFriendRequest(friendshipId, {
      onSuccess: () => {
        setNotifications((prevNotifications: NotificationProps[]) => {
          const updatedNotifications = [...prevNotifications];
          const notificationIndex = updatedNotifications.findIndex(
            (notif) => notif.id === item.id
          );
          if (notificationIndex !== -1) {
            updatedNotifications[notificationIndex].friendship.status =
              "accepted";
          }
          return updatedNotifications;
        });
      },
    });
  };

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
              {friendshipStatus == "accepted"
                ? "Vous avez acceptés l'invitation de "
                : "Vous avez reçu une invitation de la part de "}
              <Text style={styles.inviter}>{senderName}</Text>
            </Text>
            {friendshipStatus == "pending" && (
              <View style={styles.btnsContainer}>
                <TouchableOpacity
                  style={styles.acceptBtn}
                  onPress={() => accepteFriendRequest(item.friendship.id)}
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
            )}
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
