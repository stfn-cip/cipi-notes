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
import { signup } from "@/features/auth/actions";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>Create an account on Cipi Notes.</CardDescription>
      </CardHeader>

      <form className="space-y-3">
        <CardContent className="space-y-3">
          <div>
            <Label htmlFor="first-name">First Name:</Label>
            <Input id="first-name" name="first-name" type="text" />
          </div>

          <div>
            <Label htmlFor="last-name">Last Name:</Label>
            <Input id="last-name" name="last-name" type="text" />
          </div>

          <div>
            <Label htmlFor="email">Email:</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div>
            <Label htmlFor="password">Password:</Label>
            <Input id="password" name="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="justify-center flex-col gap-3">
          <Button className="rounded-full px-7" formAction={signup}>
            Sign up
          </Button>
          <CardDescription className="hover:text-accent-foreground/50 transition-colors">
            <Link href="/auth/sign-in">Already have an account?</Link>
          </CardDescription>
        </CardFooter>
      </form>
    </>
  );
}
