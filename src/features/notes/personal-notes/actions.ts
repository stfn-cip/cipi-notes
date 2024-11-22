"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const revalidatePathClient = (
  path: string,
  type?: "layout" | "page",
) => {
  revalidatePath(path, type);
};

export const insertNote = async (formData: FormData) => {
  const title = formData.get("title");
  const content = formData.get("content");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return await supabase
    .from("private_notes")
    .insert({ title, content, user_id: user?.id });
};

export const deleteNote = async (id: string) => {
  const supabase = await createClient();
  return await supabase.from("private_notes").delete().eq("id", id);
};
