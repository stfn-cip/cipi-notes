import { z, ZodFormattedError } from "zod";

export type formStateTypes<T> =
  | {
      message: string;
    }
  | ZodFormattedError<T, string>;

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const signUpSchema = z.object({
  first_name: z.string().min(1).max(20),
  last_name: z.string().min(1).max(20),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"), {
      message:
        "Password must contain at least an uppercase letter, a lowercase letter, and a number",
    }),
});
