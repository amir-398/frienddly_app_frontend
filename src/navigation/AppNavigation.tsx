import { useTokenEffect } from "@/hooks/useTokenEffect";
import { useAppSelector } from "@/redux/hooks";
import LoadingScreen from "@/screens/loadingScreen/LoadingScreen";

import { useNavigationState } from "@react-navigation/native";
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
  const activeRouteIndex = useNavigationState((state) => state?.index);
  console.log("activeRouteIndex", activeRouteIndex);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : isConnected && userData ? (
        <MainNavigation />
      ) : (
        <AuthNavigation />
      )}
    </>
  );
}
