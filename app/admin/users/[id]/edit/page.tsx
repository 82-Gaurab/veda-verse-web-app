import UpdateUserForm from "../../_components/UpdataUserForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      Edit: {id}
      <UpdateUserForm
        user={{
          id: id,
          firstName: undefined,
          lastName: undefined,
          email: "",
          username: "",
          profilePicture: undefined,
        }}
      />
    </div>
  );
}
