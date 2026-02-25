import PublicBookDetails from "@/app/(public)/book/_component/BookDetail";
import { handleGetOneBook } from "@/lib/action/book-action";

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
      User Route ko
      <PublicBookDetails book={response.data} />
    </div>
  );
}
