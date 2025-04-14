import { Link, useLoaderData, useLocation, useParams } from "react-router";

const LandingNavbar = () => {
  const user = useLoaderData();
  const location = useLocation();
  const params = useParams();
  console.log("params", params);

  return (
    <nav
      className={`${location.pathname === `/travel/${params.tripId}` ? "bg-white" : "bg-transparent"} w-full fixed`}
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
        <img
          src={user?.imageUrl || "/assets/images/david.webp"}
          alt="user"
          className="size-10 rounded-full"
        />
      </header>
    </nav>
  );
};

export default LandingNavbar;
