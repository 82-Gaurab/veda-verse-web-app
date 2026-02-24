import { handleGetAllBooks } from "@/lib/action/admin/book-action";
import DisplayBookTable from "./_component/DisplayBookTable";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = (params.page as string) || "1";
  const size = (params.size as string) || "5";
  const search = (params.search as string) || "";

  const response = await handleGetAllBooks(page, size, search as string);

  if (!response.success) {
    return <div>Failed to Load Users</div>;
  }
  return (
    <div>
      <DisplayBookTable
        books={response.data}
        pagination={response.pagination}
        search={search}
      />
      <Link
        className="px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition duration-200"
        href="/admin/books/create"
      >
        Create Book
      </Link>
    </div>
  );
}
