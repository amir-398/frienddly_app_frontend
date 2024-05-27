import ROUTES from "@/constants/ROUTES";
import Home from "@/screens/home/Home";
import PostScreen from "@/screens/home/PostScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function HomeStack() {
  const Stack = createNativeStackNavigator();
  const CustomHeader = () => {
    return null;
  };
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.Home}
      screenOptions={{ header: CustomHeader }}
    >
      <Stack.Screen name={ROUTES.Home} component={Home} />
      <Stack.Screen name={ROUTES.PostScreen} component={PostScreen} />
    </Stack.Navigator>
  );
}
