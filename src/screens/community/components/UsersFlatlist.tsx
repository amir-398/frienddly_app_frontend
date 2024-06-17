import MapSkeleton from "@/components/skeletons/MapSkeleton";
import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
import { S3ENDPOINTUSERIMAGES } from "@/constants/S3Endpoint";
import { useFriendsSuggestion, useSendFriendRequest } from "@/hooks/friends";
import { setUserInvitedFriend } from "@/redux/Slices/userInvitedFriends";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function UsersFlatlist() {
  const navigation = useNavigation() as any;
  const dispatch = useAppDispatch();
  const sendedInvitations = useAppSelector(
    (state) => state.userInvitedFriends.usersId
  );
  const { data = [], isLoading, error } = useFriendsSuggestion();
  const { mutate: sendFriendRequest } = useSendFriendRequest();

  const handleSendFriendRequest = async (userId: number) => {
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

  const isInvitationSended = (userId: number) => {
    return sendedInvitations.includes(userId);
  };

  if (error) {
    return <Text>Error loading data</Text>;
  }

  return isLoading ? (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeleton}>
        <MapSkeleton />
      </View>
      <View style={styles.skeleton}>
        <MapSkeleton />
      </View>
    </View>
  ) : (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      renderItem={({ item }) => (
        <Pressable
          style={styles.userCardContainer}
          onPress={() =>
            navigation.navigate(ROUTES.ProfilScreen, { userId: item.id })
          }
        >
          <View>
            <Image
              style={styles.profilImage}
              source={{ uri: S3ENDPOINTUSERIMAGES + item.profilImage }}
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
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: "row",
  },
  skeleton: {
    height: 180,
    width: 180,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 10,
  },
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
