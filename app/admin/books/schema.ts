import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const BookSchema = z.object({
  title: z.string().min(1, { message: "Book title is required" }),
  author: z.string().min(1, { message: "Book author is required" }),
  description: z.string().min(1, { message: "Book description is required" }),
  genre: z.array(z.string()).optional(), // multiple genres can be selected
  price: z.number().min(1, { message: "Price must be at least 1" }),
  stockAmount: z
    .number()
    .min(0, { message: "Stock amount must be at least 0" }),
  publishedYear: z.string().optional(),
  coverImg: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Max file size is 5MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png, and .webp formats are supported",
    }),
});

export type BookData = z.infer<typeof BookSchema>;

export const BookEditSchema = BookSchema.partial();
export type BookEditData = z.infer<typeof BookEditSchema>;
