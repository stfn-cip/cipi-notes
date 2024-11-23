"use client";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/features/auth/sign-in/actions";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { formStateTypes, signInSchema } from "@/features/auth/types";
import { toast } from "sonner";
import { z } from "zod";

const initialState: formStateTypes<z.infer<typeof signInSchema>> = {
  message: "",
};

export default function SignInPage() {
  const [state, formAction] = useFormState(signIn, initialState);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>Connect with your Cipi Notes account.</CardDescription>
      </CardHeader>

      <form action={formAction} className="space-y-5" noValidate>
        <FormContent state={state} />
      </form>
    </>
  );
}

const FormContent = ({
  state,
}: {
  state: formStateTypes<z.infer<typeof signInSchema>>;
}) => {
  const { pending } = useFormStatus();

  if ("message" in state && state.message) toast.error(state.message);

  return (
    <>
      <CardContent className="space-y-3">
        <div>
          <Label htmlFor="email">Email:</Label>
          <Input
            disabled={pending}
            id="email"
            name="email"
            type="email"
            required
          />
          <p
            aria-live="polite"
            className="mt-1 text-sm text-red-500"
            role="status"
          >
            {"email" in state && state["email"]?._errors[0]}
          </p>
        </div>

        <div>
          <Label htmlFor="password">Password:</Label>
          <Input
            disabled={pending}
            id="password"
            name="password"
            type="password"
            required
          />
          <p
            aria-live="polite"
            className="mt-1 text-sm text-red-500"
            role="status"
          >
            {"password" in state && state["password"]?._errors[0]}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex-col justify-center gap-3">
        <Button disabled={pending} className="w-[103.16px] rounded-full">
          {pending && <LoaderCircle className="animate-spin" />}
          Sign in
        </Button>
        <CardDescription className="transition-colors hover:text-accent-foreground/50">
          <Link href="/auth/sign-up">Don&apos;t have an account?</Link>
        </CardDescription>
      </CardFooter>
    </>
  );
};
