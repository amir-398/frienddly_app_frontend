import {
  deleteToken,
  initializeAuth,
  setToken,
} from "@/redux/Slices/authSlice";
import { useAppDispatch } from "./../redux/hooks";

export const useTokenEffect = () => {
  const dispatch = useAppDispatch();

  const storeToken = async (token: string, streamToken: string) => {
    await dispatch(setToken({ token, streamToken }));
  };

  const removeToken = async () => {
    await dispatch(deleteToken());
  };

  const handeInitializeAuth = async () => {
    await dispatch(initializeAuth());
  };

  return { storeToken, removeToken, handeInitializeAuth };
};
