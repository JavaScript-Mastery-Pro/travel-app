import { Link, NavLink } from "react-router";
import { sidebarItems } from "~/constants";

const NavItems = () => {
  return (
    <section className="flex flex-col px-6">
      <Link to="/">
        <header className="flex items-center gap-1.5 py-10 border-b border-light-100">
          <img
            src="/assets/icons/logo.svg"
            alt="Logo"
            className="size-[30px]"
          />

          <h1 className="text-base md:text-2xl font-bold text-dark-100">
            Tourvisto
          </h1>
        </header>
      </Link>

      <div className="flex flex-col justify-between h-full">
        <nav className="flex flex-col gap-3.5 pt-9">
          {sidebarItems.map((item) => (
            <NavLink key={item.id} to={item.href}>
              {({ isActive }: { isActive: boolean }) => (
                <div
                  className={`group flex items-center text-xs md:text-lg font-normal cursor-pointer text-gray-100 gap-2.5 py-[18px] px-3.5 rounded-lg ${
                    isActive
                      ? "bg-primary-100 text-white"
                      : "text-dark-200 hover:bg-primary-100 hover:text-white"
                  }`}
                >
                  <img
                    src={item.icon}
                    alt={item.label}
                    className={`group-hover:brightness-0 size-5 group-hover:invert ${isActive ? "text-white brightness-0 invert" : "text-dark-200 "}`}
                  />
                  {item.label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default NavItems;
