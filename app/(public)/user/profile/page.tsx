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
      <ProfilePage
        user={{
          ...response.data,
          profilePicture,
        }}
      />
    </div>
  );
}
