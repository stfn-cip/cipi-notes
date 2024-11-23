"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { formStateTypes, signInSchema } from "../types";
import { z } from "zod";

export async function signIn(
  prevState: formStateTypes<z.infer<typeof signInSchema>>,
  formData: FormData,
) {
  const supabase = await createClient();

  const parse = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parse.success) return parse.error.format();

  const data = parse.data;

  try {
    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) return { message: error.message };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return { message: "Failed to sign in" };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
