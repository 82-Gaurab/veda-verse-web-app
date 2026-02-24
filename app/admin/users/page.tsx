import Link from "next/link";
import DisplayUserTable from "./_components/DisplayUserTable";
import { handleGetAllUsers } from "@/lib/action/admin/user-action";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = (params.page as string) || "1";
  const size = (params.size as string) || "5";
  const search = (params.search as string) || "";

  const response = await handleGetAllUsers(page, size, search as string);

  if (!response.success) {
    throw new Error(response.message || "Failed to load users");
  }

  return (
    <div>
      <DisplayUserTable
        users={response.data}
        pagination={response.pagination}
        search={search}
      />
      <Link
        className="px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition duration-200"
        href="/admin/users/create"
      >
        Create User
      </Link>
    </div>
  );
}
