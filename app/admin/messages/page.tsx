import { handleGetAllMessages } from "@/lib/action/admin/message-action";
import DisplayMessageTable from "./_components/DisplayMessageTable";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = (params.page as string) || "1";
  const size = (params.size as string) || "5";
  const search = (params.search as string) || "";

  const response = await handleGetAllMessages(page, size, search as string);

  if (!response.success) {
    throw new Error(response.message || "Failed to load users");
  }
  return (
    <div>
      <DisplayMessageTable
        messages={response.data}
        pagination={response.pagination}
        search={search}
      />
    </div>
  );
}
