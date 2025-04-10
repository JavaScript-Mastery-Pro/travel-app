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
  placeholder: string;
}

declare interface PillProps {
  text: string;
  bgColor?: string;
  textColor?: string;
}

type Activity = {
  time: string;
  description: string;
};

type DayPlan = {
  day: number;
  location: string;
  activities: Activity[];
};

type TripData = {
  trip_name: string;
  estimated_price: string;
  duration: number;
  budget: string;
  travel_style: string;
  interests: string[];
  itinerary: DayPlan[];
};

declare interface TripCardProps {
  tripName: string;
  location: string;
  imageUrl: string;
  tags: string[];
  id: string;
  price: string;
}
