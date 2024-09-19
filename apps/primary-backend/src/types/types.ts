import { z } from "zod";

export const SignupSchema = z.object({
  email: z.string(),
  password: z.string().min(8, "Password should be atleast 8 character long"),
  name: z.string().min(3),
});

export const SigninSchema = z.object({
  email: z.string(),
  password: z.string().min(8, "Invalid Password"),
});

export const zapCreateSchema = z.object({
  availableTriggerId: z.string(),
  triggerMetadata: z.any().optional(),
  actions: z.array(
    z.object({
      availableActionId: z.string(), // send email
      actionMetadata: z.string(), // specific email
    })
  ),
});
