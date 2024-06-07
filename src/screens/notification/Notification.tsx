import InteractiveIcon from "@/components/InteractiveIcon";
import ScreenContainer from "@/components/ScreenContainer";
import FONTS from "@/constants/FONTS";
import { useGetAllNotification } from "@/hooks/notifications";
import React from "react";
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
  const { data: notificationsData, error } = useGetAllNotification();
  if (error) {
    console.log("error", error);
  }

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
        {
          <FlatList
            data={notificationsData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              if (item.targetType === "friendships") {
                return <InvitationNotif item={item} />;
              } else {
                return <NewPostNotif />;
              }
            }}
          />
        }
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
});
