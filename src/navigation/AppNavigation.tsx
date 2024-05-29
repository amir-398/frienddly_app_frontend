import { useTokenEffect } from "@/hooks/useTokenEffect";
import { useAppSelector } from "@/redux/hooks";
import LoadingScreen from "@/screens/loadingScreen/LoadingScreen";
import { useEffect } from "react";
import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./MainNavigation";
export default function AppNavigation() {
  const { handeInitializeAuth } = useTokenEffect();
  useEffect(() => {
    handeInitializeAuth();
  }, []);
  const { isConnected, userData, loading, error } = useAppSelector(
    (state) => state.authSlice
  );

  return loading ? (
    <LoadingScreen />
  ) : isConnected && userData ? (
    <MainNavigation />
  ) : (
    <AuthNavigation />
  );
}
