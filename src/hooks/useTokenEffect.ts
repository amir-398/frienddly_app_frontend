import { deleteToken, setToken } from "@/redux/Slices/authSlice";
import { useAppDispatch } from "./../redux/hooks";

export const useTokenEffect = () => {
  const dispatch = useAppDispatch();

  const storeToken = async (token: string) => {
    await dispatch(setToken(token));
  };

  const removeToken = async () => {
    await dispatch(deleteToken());
  };

  return { storeToken, removeToken };
};
