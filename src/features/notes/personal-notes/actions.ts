"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const insertNote = async (formData: FormData) => {
  const title = formData.get("title");
  const content = formData.get("content");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error } = await supabase
    .from("private_notes")
    .insert({ title, content, user_id: user?.id });

  revalidatePath("/");
  return error;
};

export const deleteNote = async (id: string) => {
  const supabase = await createClient();
  const { error } = await supabase.from("private_notes").delete().eq("id", id);

  revalidatePath("/");
  return error;
};
