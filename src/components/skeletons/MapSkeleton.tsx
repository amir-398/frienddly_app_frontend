import { Skeleton } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function MapSkeleton() {
  return (
    <View>
      <Skeleton
        LinearGradientComponent={LinearGradient}
        animation="wave"
        style={styles.skeleton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    width: "100%",
    height: "100%",
  },
});
