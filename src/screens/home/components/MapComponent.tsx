import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import PostRender from "./PostRender";
export default function MapComponent() {
  const [location, setLocation] = useState(null);
  console.log(location);

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        region={{
          latitude: 48.7768582,
          longitude: 2.4655165,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      >
        <Marker
          coordinate={{
            latitude: 48.7768582,
            longitude: 2.4655165,
          }}
          title="Hello"
          description="I am here"
        />
      </MapView>
      <PostRender />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "90%",
    width: "95%",
    alignSelf: "center",
    borderRadius: 25,
    overflow: "hidden",
    position: "relative",
  },
  map: {
    height: "100%",
    width: "100%",
    borderRadius: 25,
  },
});
