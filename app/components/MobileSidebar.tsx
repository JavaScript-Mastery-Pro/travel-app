import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import NavItems from "./NavItems";
import { Link } from "react-router";

const MobileSidebar = () => {
  let sidebarObj: SidebarComponent;
  const buttonClick = () => {
    sidebarObj.toggle();
  };
  return (
    <div className="lg:hidden flex flex-col gap-5 wrapper">
      <header className="flex justify-between items-center border-b border-light-100">
        <Link to="/" className="flex items-center gap-1.5 py-10 ">
          <img
            src="/assets/icons/logo.svg"
            alt="Logo"
            className="size-[30px]"
          />

          <h1 className="text-base md:text-2xl font-bold text-dark-100">
            Tourvisto
          </h1>
        </Link>

        <button onClick={buttonClick} className="">
          <img src="/assets/icons/menu.svg" alt="Menu" className="size-7" />
        </button>
      </header>
      <SidebarComponent
        width={270}
        // @ts-ignore
        ref={(Sidebar) => (sidebarObj = Sidebar as SidebarComponent)}
        created={() => sidebarObj.hide()}
        closeOnDocumentClick={true}
        showBackdrop={true}
        type="over"
      >
        <NavItems handleClick={buttonClick} />
      </SidebarComponent>
    </div>
  );
};

export default MobileSidebar;
