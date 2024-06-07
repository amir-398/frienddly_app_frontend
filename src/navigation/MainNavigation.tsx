import COLORS from "@/constants/COLORS";
import { useAppSelector } from "@/redux/hooks";
import Community from "@/screens/community/Community";
import ProfilScreen from "@/screens/profilScreen/ProfilScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import ChatStack from "./stacks/ChatStack";
import HomeStack from "./stacks/HomeStack";

const Tab = createBottomTabNavigator();

export default function MainNavigation() {
  const bottomBarIsVisible = useAppSelector(
    (state) => state.bottomBarIsVisible.isVisible
  );
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Accueil") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Communauté") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Mes soirées") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Chat") {
            iconName = focused ? "chatbubble" : "chatbubble-outline";
          } else if (route.name === "Profil") {
            iconName = focused ? "notifications" : "notifications-outline";
          }
          return (
            <Icon
              name={iconName ?? "home"}
              type="ionicon"
              size={size}
              color={color}
            />
          );
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
      <Tab.Screen name="Communauté" component={Community} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
}
