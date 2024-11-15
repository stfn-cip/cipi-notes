import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, signup } from "@/features/auth/actions";

export default function LoginPage() {
  return (
    <form>
      <Label htmlFor="first-name">First Name:</Label>
      <Input id="first-name" name="first-name" type="text" />
      
      <Label htmlFor="last-name">Last Name:</Label>
      <Input id="last-name" name="last-name" type="text" />

      <Label htmlFor="email">Email:</Label>
      <Input id="email" name="email" type="email" required />

      <Label htmlFor="password">Password:</Label>
      <Input id="password" name="password" type="password" required />
      
      <div className="space-x-2">
        <Button formAction={login}>Log in</Button>
        <Button formAction={signup}>Sign up</Button>
      </div>
    </form>
  );
}
