import { handleGetAllGenres } from "@/lib/action/admin/genre-action";
import CreateBook from "../_component/CreateBook";

export default async function Page() {
  const response = await handleGetAllGenres();

  if (!response.success) {
    throw new Error(response.message || "Failed to load genres");
  }

  return (
    <div>
      <CreateBook genres={response.data} />
    </div>
  );
}
