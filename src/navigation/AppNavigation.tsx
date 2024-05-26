import { useAppSelector } from "@/redux/hooks";
import Home from "@/screens/home/Home";
import LoadingScreen from "@/screens/loadingScreen/LoadingScreen";
import AuthNavigation from "./AuthNavigation";
export default function AppNavigation() {
  const { isConnected, userData, loading, error } = useAppSelector(
    (state) => state.authSlice
  );

  return loading ? (
    <LoadingScreen />
  ) : isConnected && userData ? (
    <Home />
  ) : (
    <AuthNavigation />
  );
}
