import { getValue } from "@syncfusion/ej2-base";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  type RowDataBoundEventArgs,
} from "@syncfusion/ej2-react-grids";

interface UserData {
  id: number;
  name: string;
  email: string;
  dateJoined: string;
  itineryCreated: number;
  status: string;
  img: string;
}

const data = [
  {
    id: 1,
    name: "James Anderson",
    email: "olivia@jsmastery.pro",
    dateJoined: "Jan 6, 2022",
    itineryCreated: 12,
    status: "active",
    img: "/assets/images/james.webp",
  },
  {
    id: 2,
    name: "Michael Johnson",
    email: "phoenix@jsmastery.pro",
    dateJoined: "Jan 6, 2022",
    itineryCreated: 21,
    status: "active",
    img: "/assets/images/michael.webp",
  },
  {
    id: 3,
    name: "David Brown",
    email: "lan@jsmastery.pro",
    dateJoined: "Jan 6, 2022",
    itineryCreated: 15,
    status: "offline",
    img: "/assets/images/david.webp",
  },
];
export default function UserTable() {
  const rowDataBound = (args: RowDataBoundEventArgs) => {
    if (args.row) {
      args.row.classList.add("user-row");
    }
  };
  return (
    <section>
      <GridComponent
        dataSource={data}
        gridLines="None"
        rowDataBound={rowDataBound}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="name"
            headerText="Name"
            width="200"
            textAlign="Left"
            template={(props: UserData) => {
              return (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {props.img && (
                    <img
                      src={props.img}
                      alt="User"
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "8px",
                        borderRadius: "50%",
                      }}
                    />
                  )}
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
                  className={`flex-center gap-1 w-[65px] py-[2px]  rounded-2xl mix-blend-multiply ${props.status === "active" ? " bg-success-50" : "bg-light-300"}`}
                >
                  <div
                    className={`size-1.5 rounded-full ${props.status === "active" ? "bg-success-500" : "bg-gray-500"}`}
                  />
                  <h3
                    className={`font-inter text-xs font-medium ${props.status === "active" ? "text-success-700" : "text-gray-500"}`}
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
