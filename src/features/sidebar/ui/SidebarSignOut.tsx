"use client";

import { Button } from "../../../components/ui/button";
import { LoaderCircle, LogOut } from "lucide-react";
import { useFormStatus } from "react-dom";
import { signOut } from "../actions";

export const SidebarSignOut = () => {
  return (
    <form action={signOut}>
      <SignOutButton />
    </form>
  );
};

const SignOutButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      variant="ghost"
      className="rounded-full w-8 h-9 text-red-500 hover:text-red-500 disabled:opacity-100"
    >
      {pending ? (
        <LoaderCircle size={20} className="animate-spin" />
      ) : (
        <LogOut size={20} />
      )}
    </Button>
  );
};
