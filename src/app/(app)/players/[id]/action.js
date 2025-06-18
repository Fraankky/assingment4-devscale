"use server";

import { getUsername } from "@/utils/getUsername";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updatePlayerAction(_, formData) {
  try {
    const username = await getUsername();
    
    const name = formData.get("name_0");
    const age = formData.get("age_0");
    const position = formData.get("position");
    const notelp = formData.get("notelp");
    const playerId = formData.get("playerId");
    
    if (!name || !age || !position || !notelp) {
      return {
        status: "error",
        message: "Isi semua form!",
      };
    }
    
    
    const updateData = {
      "_id": playerId,          
      "username": username,      
      "name_0": name,
      "age_0": age,           
      "position": position,
      "notelp": notelp
    };
    // bikin variable rsponse buat cek api
    const response = await fetch("https://v1.appbackend.io/v1/rows/pEbaay3ODtsk", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData)
    });

    // cek api
    if (!response.ok) {
      const errorText = await response.text();
      return {
        status: "error",
        message: `Update gagal: ${response.status} - ${errorText}`,
      };
    }
    // Revalidate paths
    revalidatePath("/");
    revalidatePath("/players");
    revalidatePath(`/players/${playerId}`);

  } catch (error) {  
    return {
      status: "error",
      message: `Terjadi kesalahan: ${error.message}`,
    };
  }

  redirect("/players")
}