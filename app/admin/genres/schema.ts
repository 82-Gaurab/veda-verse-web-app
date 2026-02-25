import z from "zod";

export const GenreSchema = z.object({
  name: z.string().min(1, { message: "Genre name is required" }),
});

export type GenreData = z.infer<typeof GenreSchema>;

export const GenreEditSchema = GenreSchema.partial();
export type GenreEditData = z.infer<typeof GenreEditSchema>;
