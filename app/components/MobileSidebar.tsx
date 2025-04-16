import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import NavItems from "./NavItems";
import { Link } from "react-router";

const MobileSidebar = () => {
  let sidebarObj: SidebarComponent;

  const buttonClick = () => {
    sidebarObj.toggle();
  };

  return (
    <div className="mobile-sidebar wrapper">
      <header>
        <Link to="/">
          <img
            src="/assets/icons/logo.svg"
            alt="Logo"
            className="size-[30px]"
          />

          <h1>Tourvisto</h1>
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
