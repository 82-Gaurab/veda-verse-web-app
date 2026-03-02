import Link from "next/link";
import { handleGetAllGenresPaginated } from "@/lib/action/admin/genre-action";
import DisplayGenreTable from "./_component/DisplayGenreTable";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = (params.page as string) || "1";
  const size = (params.size as string) || "5";
  const search = (params.search as string) || "";

  const response = await handleGetAllGenresPaginated(
    page,
    size,
    search as string,
  );

  if (!response.success) {
    throw new Error(response.message || "Failed to load users");
  }

  return (
    <div>
      <DisplayGenreTable
        genres={response.data}
        pagination={response.pagination}
        search={search}
      />
      <Link
        className="px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition duration-200"
        href="/admin/genres/create"
      >
        Create Genre
      </Link>
    </div>
  );
}
