import iconProfil from "@/assets/icons/bottomIcon.png";
import iconProfilHovered from "@/assets/icons/bottomIconHovered.png";
import COLORS from "@/constants/COLORS";
import { useChatClient } from "@/hooks/useChatClient";
import { useAppSelector } from "@/redux/hooks";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import { Image } from "react-native"; // Import de l'Image de react-native
import ChatStack from "./stacks/ChatStack";
import CommunityStack from "./stacks/CommunityStack";
import HomeStack from "./stacks/HomeStack";
import ProfilStack from "./stacks/ProfilStack";

const Tab = createBottomTabNavigator();

export default function MainNavigation() {
  const bottomBarIsVisible = useAppSelector(
    (state) => state.bottomBarIsVisible.isVisible
  );
  const { clientIsReady } = useChatClient();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Profil") {
            return (
              <Image
                source={focused ? iconProfilHovered : iconProfil}
                style={{ width: size, height: size }}
              />
            );
          } else {
            let iconName;
            if (route.name === "Accueil") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Communauté") {
              iconName = focused ? "people" : "people-outline";
            } else if (route.name === "Mes soirées") {
              iconName = focused ? "list" : "list-outline";
            } else if (route.name === "Chat") {
              iconName = focused ? "chatbubble" : "chatbubble-outline";
            }
            return (
              <Icon
                name={iconName ?? "home"}
                type="ionicon"
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarActiveTintColor: COLORS.primaryColor,
        tabBarInactiveTintColor: "#000",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 60,
          paddingBottom: 10,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          borderColor: COLORS.primaryColor,
          borderTopWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          width: "100.1%",
          alignSelf: "center",
          display: bottomBarIsVisible ? "flex" : "none",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Accueil" component={HomeStack} />
      <Tab.Screen name="Chat" component={ChatStack} />
      <Tab.Screen name="Communauté" component={CommunityStack} />
      <Tab.Screen name="Profil" component={ProfilStack} />
    </Tab.Navigator>
  );
}
