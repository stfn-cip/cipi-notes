import { User } from "@supabase/supabase-js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function CombineUserName(
  user: User | { first_name: string; last_name: string },
) {
  if ("user_metadata" in user && user.user_metadata)
    return user.user_metadata.first_name + " " + user.user_metadata.last_name;
  else if (!("user_metadata" in user))
    return user.first_name + " " + user.last_name;
}
