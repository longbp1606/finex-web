import Shopping from "@/assets/icon3D/shopping.jpg";
import Food from "@/assets/icon3D/food.jpg";
import Housing from "@/assets/icon3D/housing.jpg";
import Transportation from "@/assets/icon3D/transportation.jpg";
export interface CategoryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  target: number;
  balance: number;
}

export const categories: CategoryItem[] = [
  {
    id: "1",
    title: "Food & Dining",
    description: "Expenses for groceries, restaurants, cafes, fast food, and market shopping.",
    image: Food,
    target: 2000.000,
    balance: 300.000,
  },
  {
    id: "2",
    title: "Transportation",
    description: "Includes fuel, bus tickets, taxi, Grab, toll fees, and vehicle maintenance.",
    image: Transportation,
    target: 200000.000,
    balance: 3000.000,
  },
  {
    id: "3",
    title: "Housing",
    description: "Rent, electricity, water, internet, repairs, and home maintenance costs.",
    image: Housing,
    target: 2000.000,
    balance: 300.000,
  },
  {
    id: "4",
    title: "Shopping",
    description: "Purchases of clothing, footwear, cosmetics, household items, and electronics.",
    image: Shopping,
    target: 2000.000,
    balance: 300.000,
  },
];
