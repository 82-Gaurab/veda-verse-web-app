import z from "zod";

export const ReviewSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  comment: z.string().min(5, "Comment must be at least 5 characters"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
  bookId: z.string().min(1),
});

export type ReviewData = z.infer<typeof ReviewSchema>;
