import InteractiveIcon from "@/components/InteractiveIcon";
import ScreenContainer from "@/components/ScreenContainer";
import FONTS from "@/constants/FONTS";
import { NotificationProps } from "@/enums/notification";
import { useGetAllNotification } from "@/hooks/notifications";
import { useAppSelector } from "@/redux/hooks";
import socketService from "@/services/socket";
import React, { useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, Text, View } from "react-native";
import InvitationNotif from "./components/InvitationNotif";
import NewPostNotif from "./components/NewPostNotif";

export default function Notification({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}) {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const userId = useAppSelector((state) => state.authSlice.userData.id);

  // snapshot notifications from socket server
  useEffect(() => {
    socketService.connect(userId);
    socketService.on("notifications", (notification: NotificationProps) => {
      setNotifications((prevNotifications: NotificationProps[]) => [
        notification,
        ...prevNotifications,
      ]);
    });
    return () => {
      socketService.off("notifications");
    };
  }, []);

  // get all user notifications
  const { data: notificationsData } = useGetAllNotification();
  useEffect(() => {
    if (!notificationsData) return;
    setNotifications(notificationsData);
  }, [notificationsData]);

  return (
    <Modal visible={isVisible} animationType="slide">
      <ScreenContainer>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <InteractiveIcon
              name="arrow-back"
              type="ionicon"
              color="#000"
              onPress={() => setIsVisible(false)}
              padding={6}
            />
          </View>
          <Text style={styles.headerText}>Tes derniers notifs</Text>
        </View>
        {notifications.length > 0 ? (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              if (item.targetType === "friendships") {
                return (
                  <InvitationNotif
                    item={item}
                    setNotifications={setNotifications}
                  />
                );
              } else {
                return <NewPostNotif />;
              }
            }}
          />
        ) : (
          <Text style={styles.noneNotifText}>
            Vous n'avez pas de notification pour le moment
          </Text>
        )}
      </ScreenContainer>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#f1f1f1",
    paddingVertical: 10,
    position: "relative",
  },
  headerIcon: {
    position: "absolute",
    left: 0,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  headerText: {
    fontFamily: FONTS.poppinsBold,
    textAlign: "center",
    fontSize: 16,
  },
  noneNotifText: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: FONTS.poppinsMedium,
    marginTop: 20,
  },
});
