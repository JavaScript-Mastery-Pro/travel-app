import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import { logoutUser } from "~/appwrite/auth";
import { cn } from "~/lib/utils";

const LandingNavbar = () => {
  const user = useLoaderData();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/sign-in");
  };

  return (
    <nav
      className={cn(
        location.pathname === `/travel/${params.tripId}`
          ? "bg-white"
          : "glassmorphism",
        "w-full fixed"
      )}
    >
      <header className="flex justify-between gap-4  items-center wrapper ">
        <Link to="/" className="flex items-center gap-1.5 py-10">
          <img
            src="/assets/icons/logo.svg"
            alt="Logo"
            className="size-[30px]"
          />
          <h1 className="text-base md:text-2xl font-bold text-dark-100">
            Tourvisto
          </h1>
        </Link>
        <aside className="flex gap-4 items-center">
          {user.status === "admin" && (
            <Link
              to="/dashboard"
              className={cn("text-base font-normal text-white", {
                "text-dark-100": location.pathname.startsWith("/travel"),
              })}
            >
              Admin Panel
            </Link>
          )}

          <img
            src={user?.imageUrl || "/assets/images/david.webp"}
            alt="user"
            className="size-10 rounded-full aspect-square"
          />
          <button onClick={handleLogout} className="cursor-pointer">
            <img
              src="/assets/icons/logout.svg"
              alt="logout"
              className="size-6 rotate-180"
            />
          </button>
        </aside>
      </header>
    </nav>
  );
};

export default LandingNavbar;
