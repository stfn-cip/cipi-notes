"use server";

import { createClient } from "@/lib/supabase/server";
import { DEFAULT_LOGIN } from "@/utils/routes";
import { redirect } from "next/navigation";

export const signOut = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut({ scope: "local" });
  if (error) throw new Error();

  redirect(DEFAULT_LOGIN);
};
