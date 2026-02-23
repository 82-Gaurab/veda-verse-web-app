import { handleGetOneUser } from "@/lib/action/admin/user-action";
import UpdateUserForm from "../../_components/UpdataUserForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await handleGetOneUser(id);
  if (!response.success) {
    throw new Error(response.message || "Failed to load users");
  }

  let profilePicture = response.data["profilePicture"];

  if (
    profilePicture != null &&
    profilePicture != "default" &&
    profilePicture != ""
  ) {
    profilePicture = `${process.env.Next_PUBLIC_API_BASE_URL}${profilePicture}`;
  }

  return (
    <div>
      <UpdateUserForm
        user={{
          ...response.data,
          id,
          profilePicture,
        }}
      />
    </div>
  );
}
