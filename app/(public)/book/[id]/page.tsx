import { handleGetOneBook } from "@/lib/action/book-action";
import PublicBookDetails from "../_component/BookDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await handleGetOneBook(id);

  if (!response.success) {
    return <>FAILED TO RETRIEVE DATA</>;
  }
  return (
    <div>
      <PublicBookDetails book={response.data} />
    </div>
  );
}
