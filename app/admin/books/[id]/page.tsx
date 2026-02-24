import { handleGetOneBook } from "@/lib/action/admin/book-action";
import BookDetails from "../_component/BookDetails";

export type BookDetailsProps = {
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
  return (
    <div>
      <BookDetails book={book} />
    </div>
  );
}
