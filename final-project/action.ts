"use server";

import { cookies } from "next/headers";

export const handleDeleteCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("Authorization");
  cookieStore.delete("x-user-role");
};

export const handleLoginCookies = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("Authorization") ? true : false;
};
