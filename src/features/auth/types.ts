import { z, ZodFormattedError } from "zod";

export const signInSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});

export type formStateTypes<T> =
  | {
      message: string;
    }
  | ZodFormattedError<T, string>;
