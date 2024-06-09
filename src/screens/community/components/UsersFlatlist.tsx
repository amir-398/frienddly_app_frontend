import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import { useFriendsSuggestion, useSendFriendRequest } from "@/hooks/friends";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function UsersFlatlist() {
  const [sendedInvitations, setSendedInvitations] = useState<number[]>([]);
  const { data = [], isLoading, error } = useFriendsSuggestion();
  const { mutate: sendFriendRequest } = useSendFriendRequest();

  const handleSendFriendRequest = async (userId: number) => {
    try {
      sendFriendRequest(userId, {
        onSuccess: () => {
          setSendedInvitations([...sendedInvitations, userId]);
        },
        onError: (error) => {
          console.log("error", error);
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const isInvitationSended = (userId: number) => {
    return sendedInvitations.includes(userId);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading data</Text>;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      renderItem={({ item }) => (
        <View style={styles.userCardContainer}>
          <View>
            <Image
              style={styles.profilImage}
              source={{ uri: item.profilImage }}
            />
            <Text style={styles.cardText}>
              {item.firstname} {item.lastname}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.btnContainer,
              {
                width: isInvitationSended(item.id) ? 160 : 100,
                backgroundColor: isInvitationSended(item.id)
                  ? "grey"
                  : COLORS.primaryColor,
              },
            ]}
            onPress={() => handleSendFriendRequest(item.id)}
            disabled={isInvitationSended(item.id)}
          >
            <Text style={styles.btnText}>
              {isInvitationSended(item.id) ? "Invitation envoyée" : "Inviter"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  userCardContainer: {
    margin: 10,
    padding: 10,
    borderColor: COLORS.primaryColor,
    borderWidth: 2,
    height: 180,
    width: 180,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  profilImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    alignSelf: "center",
  },
  cardText: {
    fontSize: 16,
    fontFamily: FONTS.poppinsMedium,
  },
  btnContainer: {
    backgroundColor: COLORS.primaryColor,
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    width: 100,
  },
  btnText: {
    color: "#fff",
    fontFamily: FONTS.poppinsMedium,
    textAlign: "center",
    fontSize: 16,
  },
});
