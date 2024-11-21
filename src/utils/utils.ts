import { User } from "@supabase/supabase-js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type UserTypes =
  | (User & { user_metadata: { first_name: string; last_name: string } })
  | { first_name: string; last_name: string };

export function CombineUserName(user: UserTypes) {
  if ("user_metadata" in user)
    return user.user_metadata.first_name + " " + user.user_metadata.last_name;
  else return user.first_name + " " + user.last_name;
}
