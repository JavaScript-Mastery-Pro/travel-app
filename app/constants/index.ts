import type { ItemModel } from "@syncfusion/ej2-react-navigations";

export const sidebarItems = [
  {
    id: 1,
    icon: "/assets/icons/home.svg",
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    id: 3,
    icon: "/assets/icons/users.svg",
    label: "All Users",
    href: "/all-users",
  },
  {
    id: 4,
    icon: "/assets/icons/itinerary.svg",
    label: "AI Trips",
    href: "/trips",
  },
];

export const chartOneData: object[] = [
  {
    x: "Jan",
    y1: 0.5,
    y2: 1.5,
    y3: 0.7,
  },
  {
    x: "Feb",
    y1: 0.8,
    y2: 1.2,
    y3: 0.9,
  },
  {
    x: "Mar",
    y1: 1.2,
    y2: 1.8,
    y3: 1.5,
  },
  {
    x: "Apr",
    y1: 1.5,
    y2: 2.0,
    y3: 1.8,
  },
  {
    x: "May",
    y1: 1.8,
    y2: 2.5,
    y3: 2.0,
  },
  {
    x: "Jun",
    y1: 2.0,
    y2: 2.8,
    y3: 2.5,
  },
];

export const travelStyles: DropdownItem[] = [
  {
    name: "Relaxed",
  },
  {
    name: "Luxury",
  },
  {
    name: "Adventure",
  },
  {
    name: "Cultural",
  },
  {
    name: "Nature & Outdoors",
  },
  {
    name: "City Exploration",
  },
];

export const interests: DropdownItem[] = [
  {
    name: "Food & Culinary",
  },
  {
    name: "Historical Sites",
  },
  {
    name: "Hiking & Nature Walks",
  },
  {
    name: "Beaches & Water Activities",
  },
  {
    name: "Museums & Art",
  },
  {
    name: "Nightlife & Bars",
  },
  {
    name: "Photography Spots",
  },
  {
    name: "Shopping",
  },
  {
    name: "Local Experiences",
  },
];

export const budgetOptions: DropdownItem[] = [
  {
    name: "Budget",
  },
  {
    name: "Mid-range",
  },
  {
    name: "Luxury",
  },
  {
    name: "Premium",
  },
];

export const groupTypes: DropdownItem[] = [
  {
    name: "Solo",
  },
  {
    name: "Couple",
  },
  {
    name: "Family",
  },
  {
    name: "Friends",
  },
  {
    name: "Business",
  },
];
