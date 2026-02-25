import { handleGetAllOrders } from "@/lib/action/admin/order-action";
import DisplayOrderTable from "./_component/DisplayOrderTable";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = (params.page as string) || "1";
  const size = (params.size as string) || "5";
  const search = (params.search as string) || "";

  const response = await handleGetAllOrders(page, size, search as string);

  if (!response.success) {
    return <div>Failed to load orders</div>;
  }

  return (
    <div>
      <DisplayOrderTable
        orders={response.data}
        pagination={response.pagination}
        search={search}
      />
    </div>
  );
}
