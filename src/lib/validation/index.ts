import * as z from "zod"
export const SignupValidation = z.object({
    name: z.string().min(2, {message: "Please enter"}),
    username: z.string().min(2, {message: "Please enter"}),
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must be at least 8 characters"}),
  })