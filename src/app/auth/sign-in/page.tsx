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
import { login } from "@/features/auth/actions";
import Link from "next/link";

export default function SignInPage() {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>Connect with your Cipi Notes account.</CardDescription>
      </CardHeader>

      <form className="space-y-5">
        <CardContent className="space-y-3">
          <div>
            <Label htmlFor="email">Email:</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div>
            <Label htmlFor="password">Password:</Label>
            <Input id="password" name="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex-col justify-center gap-3">
          <Button className="rounded-full px-7" formAction={login}>
            Sign in
          </Button>
          <CardDescription className="transition-colors hover:text-accent-foreground/50">
            <Link href="/auth/sign-up">Don&apos;t have an account?</Link>
          </CardDescription>
        </CardFooter>
      </form>
    </>
  );
}
