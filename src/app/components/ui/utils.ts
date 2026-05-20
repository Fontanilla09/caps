import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Checks if a caterer has a booking conflict for a given date and time
export function hasCatererConflict(reservations, catererName, date, time) {
  return reservations.some(
    (res) =>
      res.caterer === catererName &&
      res.date === date &&
      res.time === time &&
      ["pending", "confirmed"].includes(res.status)
  );
}
