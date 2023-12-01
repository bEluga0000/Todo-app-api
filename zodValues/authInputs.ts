import { z } from "zod";
export const signupInputs = z.object({
    username: z.string(),
    password: z.string()
})