import Shopping from "@/assets/icon3D/shopping.jpg";
import Food from "@/assets/icon3D/food.jpg";
import Housing from "@/assets/icon3D/housing.jpg";
import Transportation from "@/assets/icon3D/transportation.jpg";
export interface CategoryItem {
  id: string; 
  categoryName: string;
  description: string;
  currencyUnit: "USD" | "VND";
  target: number;
  balance: number;
  backgroundImage: string; 
  accentColor: string; 
}


export const categories: CategoryItem[] = [
  {
    id: "1",
    categoryName: "Food & Dining",
    description: "Expenses for groceries, restaurants, cafes, fast food, and market shopping.",
    backgroundImage: Food,
    currencyUnit: "USD",
    target: 2000.0,
    balance: 300.0,
    accentColor: "#ffffff",
  },
  {
    id: "2",
    categoryName: "Transportation",
    description: "Includes fuel, bus tickets, taxi, Grab, toll fees, and vehicle maintenance.",
    backgroundImage: Transportation,
    currencyUnit: "USD",
    target: 200000.0,
    balance: 3000.0,
    accentColor: "#f2ced8",
  },
  {
    id: "3",
    categoryName: "Housing",
    description: "Rent, electricity, water, internet, repairs, and home maintenance costs.",
    backgroundImage: Housing,
    currencyUnit: "USD",
    target: 2000.0,
    balance: 300.0,
    accentColor: "#eaf2e7",
  },
  {
    id: "4",
    categoryName: "Shopping",
    description: "Purchases of clothing, footwear, cosmetics, household items, and electronics.",
    backgroundImage: Shopping,
    currencyUnit: "USD",
    target: 2000.0,
    balance: 300.0,
    accentColor: "#d1eeff",
  },
];
