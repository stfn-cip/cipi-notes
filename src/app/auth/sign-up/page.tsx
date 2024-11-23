"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/features/auth/sign-up/actions";
import { formStateTypes, signUpSchema } from "@/features/auth/types";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { z } from "zod";

type stateTypes = formStateTypes<z.infer<typeof signUpSchema>>;
const initialState: stateTypes = {
  message: "",
};

export default function SignUpPage() {
  const [state, formAction] = useFormState(signUp, initialState);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>Create an account on Cipi Notes.</CardDescription>
      </CardHeader>

      <form action={formAction} className="space-y-3" noValidate>
        <FormContent state={state} />
      </form>
    </>
  );
}

const FormContent = ({ state }: { state: stateTypes }) => {
  const { pending } = useFormStatus();

  useEffect(() => {
    if ("message" in state && state.message) toast.error(state.message);
  }, [state]);

  return (
    <>
      <CardContent className="space-y-3">
        <div>
          <Label htmlFor="first-name">First Name:</Label>
          <Input id="first-name" name="first-name" type="text" required />
          <p
            aria-live="polite"
            className="mt-1 text-sm text-red-500"
            role="status"
          >
            {"first_name" in state && state["first_name"]?._errors[0]}
          </p>
        </div>

        <div>
          <Label htmlFor="last-name">Last Name:</Label>
          <Input id="last-name" name="last-name" type="text" required />
          <p
            aria-live="polite"
            className="mt-1 text-sm text-red-500"
            role="status"
          >
            {"last_name" in state && state["last_name"]?._errors[0]}
          </p>
        </div>

        <div>
          <Label htmlFor="email">Email:</Label>
          <Input id="email" name="email" type="email" required />
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
          <Input id="password" name="password" type="password" required />
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
          Sign up
        </Button>
        <CardDescription className="transition-colors hover:text-accent-foreground/50">
          <Link href="/auth/sign-in">Already have an account?</Link>
        </CardDescription>
      </CardFooter>
    </>
  );
};
