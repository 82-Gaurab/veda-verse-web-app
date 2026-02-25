import { handleGetOneGenre } from "@/lib/action/admin/genre-action";
import UpdateGenreForm from "../../_component/UpdateGenre";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await handleGetOneGenre(id);
  const genre = response.data;
  if (!genre) {
    return <div>Genre not found</div>;
  }
  return (
    <div>
      <UpdateGenreForm genre={genre} />
    </div>
  );
}
