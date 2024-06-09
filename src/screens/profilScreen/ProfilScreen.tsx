import { useAppSelector } from "@/redux/hooks";
import { Icon } from "@rneui/themed";
import React from "react";
import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native";

export default function ProfilScreen() {
  const userData = useAppSelector((state) => state.authSlice.userData);
  return (
    <ScrollView>
      <View style={styles.iconSettingsContainer}>
        <Icon name="settings-outline" type="ionicon" size={24} />
      </View>
      <View>
        <Image
          source={{ uri: userData?.imageProfil }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  iconSettingsContainer: {
    alignItems: "flex-end",
    margin: 10,
  },
});
