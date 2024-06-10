import ROUTES from "@/constants/ROUTES";
import EditProfilData from "@/screens/profilScreen/EditProfilData";
import ProfilScreen from "@/screens/profilScreen/ProfilScreen";
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
      <Stack.Screen name={ROUTES.ProfilScreen} component={ProfilScreen} />
      <Stack.Screen name={ROUTES.EditProfilData} component={EditProfilData} />
    </Stack.Navigator>
  );
}
