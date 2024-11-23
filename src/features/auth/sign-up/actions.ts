"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        first_name: formData.get("first-name") as string,
        last_name: formData.get("last-name") as string,
      },
    },
  };
  const { error } = await supabase.auth.signUp(data);

  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
  redirect("/");
}