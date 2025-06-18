"use server";

import { getUsername } from "@/utils/getUsername";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPlayerAction(_, formData) {
  const username = await getUsername();

  const name = formData.get("name_0");
  const age = formData.get("age_0");
  const position = formData.get("position");
  const notelp = formData.get("notelp");

  console.log({ name, age, position, notelp });

  if (!name || !age || !position || !notelp) {
    return {
      status: "error",
      message: "Isi semua form!",
    };
  }

  const playerData = {
    username,
    name_0: name,
    age_0: age, 
    position,
    notelp,
  };

  try {
    const response = await fetch("https://v1.appbackend.io/v1/rows/pEbaay3ODtsk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([playerData]),
    });

    // cek response api
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      return {
        status: "error",
        message: "Gagal menyimpan data ke server",
      };
    }

    revalidatePath("/");
    revalidatePath("/players");

    return {
      status: "success",
      message: "Player berhasil ditambahkan",
    };

  } catch (error) {
    console.error("Network Error:", error);
    return {
      status: "error",
      message: "Terjadi kesalahan jaringan",
    };
  }
}

export async function deletePlayerAction(formData) {
  const id = formData.get("id");
  
   await fetch("https://v1.appbackend.io/v1/rows/pEbaay3ODtsk", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([id]),
    });

    revalidatePath("/");
    revalidatePath("/players");

    redirect("/players");


}