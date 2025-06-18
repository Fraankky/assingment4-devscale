"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function loginAction(_, formData) {
  const cookieStore = await cookies();
  const user = cookieStore.get("username");

  const username = formData.get("username");

  if (!username) {
    return {
      status: "error",
      message: "Username dan password harus diisi",
    };
  }

  const res = await fetch("https://v1.appbackend.io/v1/rows/pEbaay3ODtsk");
  const data = await res.json();
  const users = data.data;

  cookieStore.set("username", users);

  revalidatePath("/")
  redirect('/players');
}
