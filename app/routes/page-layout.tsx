import { Outlet, redirect } from "react-router";
import { getExistingUser, storeUserData } from "~/appwrite/auth";
import { account } from "~/appwrite/client";
import LandingNavbar from "~/components/LandingNavbar";

export async function clientLoader() {
  try {
    const user = await account.get();
    const existingUser = await getExistingUser(user.$id);
    if (!user.$id) return redirect("/sign-in");
    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (error) {
    console.error("Error in clientLoader:", error);
    return redirect("/sign-in");
  }
}

const PageLayout = () => {
  return (
    <div className="bg-light-200">
      <LandingNavbar />
      <Outlet />
    </div>
  );
};

export default PageLayout;
