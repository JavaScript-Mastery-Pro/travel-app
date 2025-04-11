import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
} from "@syncfusion/ej2-react-grids";
import {
  DropDownButtonComponent,
  type ItemModel,
  type OpenCloseMenuEventArgs,
} from "@syncfusion/ej2-react-splitbuttons";

export default function UserTable({ data }: { data: UserData[] }) {
  let ddb: DropDownButtonComponent;
  const items: ItemModel[] = [
    {
      text: "Date (ascending)",
    },
    {
      text: "Date (descending)",
    },
    {
      text: "Name (ascending)",
    },
    {
      text: "Name (descending)",
    },
  ];

  const onOpen = (args: OpenCloseMenuEventArgs) => {
    const elem = args.element.parentElement as HTMLElement;
    elem.style.left = elem.offsetLeft - 100 + "px";
  };
  const onSelect = (args: OpenCloseMenuEventArgs) => {
    const elem = args.element.parentElement as HTMLElement;
    console.log(elem.innerText);
  };
  return (
    <section className="flex flex-col gap-6">
      <GridComponent dataSource={data} gridLines="None">
        <ColumnsDirective>
          <ColumnDirective
            field="name"
            headerText="Name"
            width="200"
            textAlign="Left"
            template={(props: UserData) => {
              return (
                <div className="flex items-center gap-1.5 px-4">
                  <img
                    src={props.img}
                    alt="User"
                    className="rounded-full size-8"
                  />
                  <span>{props.name}</span>
                </div>
              );
            }}
          />
          <ColumnDirective
            field="email"
            headerText="Email Address"
            width="150"
            textAlign="Left"
          />
          <ColumnDirective
            field="dateJoined"
            headerText="Date Joined"
            width="120"
            textAlign="Left"
          />
          <ColumnDirective
            field="itineryCreated"
            headerText="Itinerary Created"
            width="130"
            textAlign="Left"
          />
          <ColumnDirective
            field="status"
            headerText="Status"
            width="100"
            textAlign="Left"
            template={(props: UserData) => {
              return (
                <article
                  className={`flex-center gap-1 w-[65px] py-[2px]  rounded-2xl mix-blend-multiply ${props.status === "user" ? " bg-success-50" : "bg-light-300"}`}
                >
                  <div
                    className={`size-1.5 rounded-full ${props.status === "user" ? "bg-success-500" : "bg-gray-500"}`}
                  />
                  <h3
                    className={`font-inter text-xs font-medium ${props.status === "user" ? "text-success-700" : "text-gray-500"}`}
                  >
                    {props.status}
                  </h3>
                </article>
              );
            }}
          />
        </ColumnsDirective>
      </GridComponent>
    </section>
  );
}
