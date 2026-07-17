"use server";

import { cookies } from "next/headers";

export const handleDeleteCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("Authorization");
};

export const handleLoginCookies = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("Authorization") ? true : false;
};
