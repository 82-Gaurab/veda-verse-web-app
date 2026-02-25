import { handleGetOneBook } from "@/lib/action/admin/book-action";
import EditBookForm from "../../_component/EditBookForm";
import { handleGetAllGenres } from "@/lib/action/admin/genre-action";

export type EditBookProps = {
  id: string;
  title: string;
  author: string;
  description: string;
  genres: string[];
  price: number;
  stockAmount: number;
  publishedYear: number;
  coverImg: string;
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await handleGetOneBook(id);
  const book = response.data;
  if (!book) {
    return <div>Book not found</div>;
  }

  const genreResponse = await handleGetAllGenres();

  if (!genreResponse.success) {
    throw new Error(genreResponse.message || "Failed to load genres");
  }

  return (
    <div>
      <EditBookForm book={book} genres={genreResponse.data} />
    </div>
  );
}
