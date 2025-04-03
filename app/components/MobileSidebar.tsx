import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import NavItems from "./NavItems";

const MobileSidebar = () => {
  let sidebarObj: SidebarComponent;
  const buttonClick = () => {
    sidebarObj.toggle();
  };
  return (
    <div className="lg:hidden flex flex-col gap-5">
      <button onClick={buttonClick} className="fixed left-4 top-5">
        <img src="/assets/icons/menu.svg" alt="Menu" className="size-7" />
      </button>
      <SidebarComponent
        width={270}
        // @ts-ignore
        ref={(Sidebar) => (sidebarObj = Sidebar as SidebarComponent)}
        created={() => sidebarObj.hide()}
        closeOnDocumentClick={true}
        showBackdrop={true}
        type="over"
      >
        <NavItems />
      </SidebarComponent>
    </div>
  );
};

export default MobileSidebar;
