import ROUTES from "@/constants/ROUTES";
import EditProfilData from "@/screens/profilScreen/EditProfilData";
import ProfilScreen from "@/screens/profilScreen/ProfilScreen";
import ChangePassword from "@/screens/profilScreen/components/ChangePassword";
import Settings from "@/screens/profilScreen/components/Settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function ProfilStack() {
  const Stack = createNativeStackNavigator();
  const CustomHeader = () => {
    return null;
  };
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.ProfilScreen}
      screenOptions={{ header: CustomHeader }}
    >
      <Stack.Screen
        name={ROUTES.ProfilScreen}
        component={ProfilScreen}
        options={{
          statusBarColor: "transparent",
          statusBarTranslucent: true,
        }}
      />
      <Stack.Screen
        name={ROUTES.EditProfilData}
        component={EditProfilData}
        options={{
          statusBarColor: "transparent",
          statusBarTranslucent: true,
        }}
      />
      <Stack.Screen
        name={ROUTES.Settings}
        component={Settings}
        options={{
          statusBarColor: "#fff",
        }}
      />
      <Stack.Screen
        name={ROUTES.ChangePassword}
        component={ChangePassword}
        options={{
          statusBarColor: "transparent",
          statusBarTranslucent: true,
        }}
      />
    </Stack.Navigator>
  );
}
