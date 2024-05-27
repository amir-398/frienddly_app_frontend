import { useAppSelector } from "@/redux/hooks";
import LoadingScreen from "@/screens/loadingScreen/LoadingScreen";
import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./MainNavigation";
export default function AppNavigation() {
  const { isConnected, userData, loading, error } = useAppSelector(
    (state) => state.authSlice
  );
  console.log("AppNavigation -> isConnected", isConnected);

  return loading ? (
    <LoadingScreen />
  ) : isConnected && userData ? (
    <MainNavigation />
  ) : (
    <AuthNavigation />
  );
}
