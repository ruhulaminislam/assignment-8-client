import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getTokenFromServer = async () => {
  const  data  = await auth.api.getToken({
    headers: await headers(),
  });
    const  token=data?.token
  return token;
};