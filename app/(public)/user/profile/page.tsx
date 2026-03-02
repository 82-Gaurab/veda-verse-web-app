import ProfilePage from "../_component/ProfilePage";
import { handleGetMyData } from "@/lib/action/auth-action";

export default async function Page() {
  const response = await handleGetMyData();

  if (!response.success) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Failed To Fetch Your Data
      </div>
    );
  }
  let profilePicture = response.data["profilePicture"];

  if (
    profilePicture != null &&
    profilePicture != "default" &&
    profilePicture != ""
  ) {
    profilePicture = `${process.env.NEXT_PUBLIC_API_BASE_URL}${profilePicture}`;
  }

  return (
    <div>
      <div className="relative min-h-screen bg-emerald-50 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl" />
        <ProfilePage
          user={{
            ...response.data,
            profilePicture,
          }}
        />
      </div>
    </div>
  );
}
