import COLORS from "@/constants/COLORS";
import { useGetAllPosts } from "@/hooks/posts";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import PostRender from "./PostRender";
import SearchBar from "./SearchBar";
interface Post {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  category: {
    id: number;
    name: string;
  };
  images: [
    {
      url: string;
      postId: number;
      id: number;
    }
  ];
}
interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
export default function MapComponent({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: number | null;
  setSelectedCategory: (id: number) => void;
}) {
  const [region, setRegion] = useState<Region | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // get user position
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  // Récupère les posts en fonction de la région
  const { data: posts } = useGetAllPosts({
    lgt: region?.longitude ?? "",
    ltd: region?.latitude ?? "",
    cat: selectedCategory ?? "",
  });

  // add new posts to the postsData
  useEffect(() => {
    if (posts && (posts as Post[]).length > 0) {
      if (!selectedCategory) {
        setPostsData((prev) => {
          // Filtre les posts pour n'ajouter que ceux qui n'existent pas déjà
          const newPosts = (posts as Post[]).filter(
            (post: Post) =>
              !prev?.some((existingPost: Post) => existingPost.id === post.id)
          );

          return [...prev, ...newPosts];
        });
      } else {
        setPostsData(posts as Post[]);
      }
    }
  }, [posts]);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: region?.latitude ?? 46.603354,
          longitude: region?.longitude ?? 1.888334,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
        onRegionChangeComplete={(region) => {
          setRegion({
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
          });
        }}
        style={styles.map}
        showsUserLocation={true}
        loadingEnabled={true}
        loadingIndicatorColor={COLORS.secondaryColor}
        onMarkerDeselect={() => setSelectedPost(null)}
        showsPointsOfInterest={false}
        showsCompass={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        showsMyLocationButton={false}
      >
        {postsData?.map((post: Post) => (
          <Marker
            key={post.id}
            onSelect={() => setSelectedPost(post)}
            coordinate={{
              latitude: post.latitude,
              longitude: post.longitude,
            }}
            image={
              post?.category.id == 1
                ? selectedPost?.id == post.id
                  ? require("@/assets/mapIcons/restaurant_selected.png")
                  : require("@/assets/mapIcons/restaurant.png")
                : post?.category.id == 2
                ? selectedPost?.id == post.id
                  ? require("@/assets/mapIcons/party_selected.png")
                  : require("@/assets/mapIcons/party.png")
                : selectedPost?.id == post.id
                ? require("@/assets/mapIcons/super_selected.png")
                : require("@/assets/mapIcons/super.png")
            }
          />
        ))}
      </MapView>
      <SearchBar />
      {selectedPost && <PostRender post={selectedPost} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 400,
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
