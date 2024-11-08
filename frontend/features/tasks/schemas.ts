import * as z from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
