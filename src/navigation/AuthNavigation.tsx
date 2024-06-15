import SignInScreen from "@/screens/authScreens/signInScreens/SignInScreen";
import SignUpScreenStep1 from "@/screens/authScreens/signUpScreens/SignUpScreenStep1";
import SignUpScreenStep2 from "@/screens/authScreens/signUpScreens/SignUpScreenStep2";
import SignUpScreenStep3 from "@/screens/authScreens/signUpScreens/SignUpScreenStep3";
import SignUpScreenStep4 from "@/screens/authScreens/signUpScreens/SignUpScreenStep4";
import SignUpScreenStep5 from "@/screens/authScreens/signUpScreens/SignUpScreenStep5";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ROUTES from "../constants/ROUTES";
import LandingScreen from "../screens/authScreens/LandingScreen";
export default function AuthNavigation() {
  const Stack = createNativeStackNavigator();
  const CustomHeader = () => {
    return null;
  };

  return (
    <Stack.Navigator
      initialRouteName={ROUTES.LandingPage}
      screenOptions={{ header: CustomHeader }}
    >
      <Stack.Screen name={ROUTES.LandingPage} component={LandingScreen} />
      <Stack.Screen name={ROUTES.SignInScreen} component={SignInScreen} />
      <Stack.Screen
        name={ROUTES.SignUpScreenStep1}
        component={SignUpScreenStep1}
      />
      <Stack.Screen
        name={ROUTES.SignUpScreenStep2}
        component={SignUpScreenStep2}
      />
      <Stack.Screen
        name={ROUTES.SignUpScreenStep3}
        component={SignUpScreenStep3}
      />
      <Stack.Screen
        name={ROUTES.SignUpScreenStep4}
        component={SignUpScreenStep4}
      />
      <Stack.Screen
        name={ROUTES.SignUpScreenStep5}
        component={SignUpScreenStep5}
      />
    </Stack.Navigator>
  );
}
