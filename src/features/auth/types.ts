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
  first_name: z.string().min(2).max(50).regex(new RegExp("^[a-zA-ZÀ-ÿ' -]+$"), {
    message: "Invalid name",
  }),
  last_name: z.string().min(2).max(50).regex(new RegExp("^[a-zA-ZÀ-ÿ' -]+$"), {
    message: "Invalid name",
  }),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(64)
    .regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"), {
      message:
        "Password must contain at least an uppercase letter, a lowercase letter, and a number",
    }),
});
