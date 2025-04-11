declare interface UserData {
  id: string;
  name: string;
  email: string;
  dateJoined: string;
  itineryCreated: number;
  status: "user" | "admin";
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

declare interface Activity {
  time: string;
  description: string;
}

declare interface DayPlan {
  day: number;
  location: string;
  activities: Activity[];
}

declare interface Location {
  city: string;
  coordinates: [number, number];
  openStreetMap: string;
}

declare interface TripData {
  trip_name: string;
  trip_description: string;
  estimated_price: string;
  duration: number;
  budget: string;
  travel_style: string;
  interests: string;
  group_type: string;
  country: string;
  imageUrls: string[];
  itinerary: DayPlan[];
  best_time_to_visit: string[];
  weather_info: string[];
  location: Location;
}

declare interface Trips {
  tripDetail: TripData;
  imageUrls: string[];
  $id: string;
}

declare interface TripCardProps {
  tripName: string;
  location: string;
  imageUrl: string;
  tags: string[];
  id: string;
  price: string;
}

declare interface StatsCardType {
  headerTitle: string;
  total: number;
  lastMonthCount: number;
  thisMonthCount: number;
}

declare interface TrendResult {
  trend: "increment" | "decrement" | "no change";
  percentage: number;
}
declare interface DashboardStats {
  totalUsers: number;
  usersJoinedThisMonth: number;
  usersJoinedLastMonth: number;
  usersWithRoleUser: number;
  usersWithRoleUserThisMonth: number;
  usersWithRoleUserLastMonth: number;
  totalTrips: number;
  tripsCreatedThisMonth: number;
  tripsCreatedLastMonth: number;
}
