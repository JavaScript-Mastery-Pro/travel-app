declare interface UserData {
  id: string;
  name: string;
  email: string;
  dateJoined: string;
  itineryCreated: number;
  status: string;
  img: string;
}

declare interface User {
  id: string;
  name: string;
  email: string;
  dateJoined: string;
  img: string;
}

declare interface CountryListItem {
  name: string;
  coordinates: [number, number];
  flag: string;
  openStreetMap?: string;
}

declare interface DropdownItem {
  name: string;
}

declare interface SelectProps {
  data: CountryListItem[] | DropdownItem[];
  onValueChange: (value: string) => void;
  id: string;
  label: string;
  className?: string;
  placeholder: string;
}
