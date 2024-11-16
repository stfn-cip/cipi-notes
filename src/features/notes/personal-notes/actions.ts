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
    .from("private-notes")
    .insert({ title, content, user_id: user?.id });

  revalidatePath("/");
  return error;
};

