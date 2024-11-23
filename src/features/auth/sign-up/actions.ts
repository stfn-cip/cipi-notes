"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formStateTypes, signUpSchema } from "../types";
import { z } from "zod";

export async function signUp(
  prevState: formStateTypes<z.infer<typeof signUpSchema>>,
  formData: FormData,
) {
  const supabase = await createClient();

  const unvalidatedData = {
    first_name: formData.get("first-name"),
    last_name: formData.get("last-name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const parse = signUpSchema.safeParse(unvalidatedData);

  if (!parse.success) return parse.error.format();

  const { first_name, last_name, email, password } = parse.data;
  const data = {
    email,
    password,
    options: {
      data: {
        first_name,
        last_name,
      },
    },
  };

  try {
    const { error } = await supabase.auth.signUp(data);
    if (error) return { message: error.message };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return { message: "Failed to sign up" };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
