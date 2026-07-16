'use server'

import { cookies } from "next/headers";

export const handleDeleteCookies = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("Authorization");
};
