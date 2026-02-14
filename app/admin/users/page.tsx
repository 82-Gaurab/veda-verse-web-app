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
        className="text-blue-500 border border-blue-500 p-2 rounded inline-block"
        href="/admin/users/create"
      >
        Create User
      </Link>
    </div>
  );
}
