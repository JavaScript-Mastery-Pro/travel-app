import { Outlet, redirect } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";

import { getExistingUser, storeUserData } from "~/appwrite/auth";
import { account } from "~/appwrite/client";
import { MobileSidebar, NavItems } from "~/components";

export async function clientLoader() {
  try {
    const user = await account.get();
    if (!user) {
      return redirect("/sign-in");
    }
    const userExists = await getExistingUser(user.$id);
    if (!userExists) {
      await storeUserData();
    }
  } catch (error) {
    console.error("Error in clientLoader:", error);
    return redirect("/sign-in");
  }
}

export default function Dashboard() {
  return (
    <div className="flex h-screen w-full">
      <MobileSidebar />
      <aside className="w-full max-w-[270px] max-lg:hidden">
        <SidebarComponent width={270}>
          <NavItems />
        </SidebarComponent>
      </aside>
      <aside className="w-full h-full bg-light-200 pt-12 lg:pt-10">
        <Outlet />
      </aside>
    </div>
  );
}
