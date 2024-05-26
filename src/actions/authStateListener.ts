import { useGetUserData } from "@/hooks/userData";
import { setUserInfo } from "@/redux/Slices/userInfoSlice";
import { useAppDispatch } from "@/redux/hooks";
const authStateListener = async () => {
  const dispatch = useAppDispatch();
  const { data, error } = useGetUserData();
  if (error) {
    console.log("error", error);
    return;
  }
  dispatch(setUserInfo(data));
};
export default authStateListener;
