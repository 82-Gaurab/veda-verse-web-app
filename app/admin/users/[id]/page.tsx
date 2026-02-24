import { handleGetOneUser } from "@/lib/action/admin/user-action";
import UserDetail from "../_components/UserDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await handleGetOneUser(id);
  const user = response.data;
  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <div>
      <UserDetail user={user} />
    </div>
  );
}
