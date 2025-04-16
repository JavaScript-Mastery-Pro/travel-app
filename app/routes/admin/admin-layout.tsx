import { Outlet, redirect } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";

import { getExistingUser, storeUserData } from "~/appwrite/auth";
import { account } from "~/appwrite/client";
import { MobileSidebar, NavItems } from "~/components";

export async function clientLoader() {
  try {
    const user = await account.get();
    if (!user?.$id) return redirect("/sign-in");

    const existingUser = await getExistingUser(user.$id);
    if (existingUser?.status === "user") return redirect("/");

    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (error) {
    console.error("Error in clientLoader:", error);
    return redirect("/sign-in");
  }
}

const AdminLayout = () => (
  <div className="admin-layout">
    <MobileSidebar />

    <aside className="w-full max-w-[270px] hidden lg:block">
      <SidebarComponent width={270} enableGestures={false}>
        <NavItems />
      </SidebarComponent>
    </aside>

    <aside className="children">
      <Outlet />
    </aside>
  </div>
);

export default AdminLayout;
