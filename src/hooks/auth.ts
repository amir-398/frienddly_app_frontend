import { useMutation } from "@tanstack/react-query";
import ky from "ky";

const register = async (data: { data: string }) => {
  console.log("data", data);

  try {
    const reponse = await ky
      .post("http://192.168.1.81:3333/api/v1/auth/register", { json: data })
      .blob();
    return reponse;
  } catch (error) {
    throw error;
  }
};

export function useRegister() {
  return useMutation({
    mutationKey: ["userRegister"],
    mutationFn: register,
  });
}
