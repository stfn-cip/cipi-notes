import { User } from "@supabase/supabase-js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function GetUserName(user: User) {
  return user.user_metadata.first_name + " " + user.user_metadata.last_name;
}
