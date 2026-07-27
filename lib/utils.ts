import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Onboarding form helpers ---
export function ageFromDob(dobString: string): number | null {
  if (!dobString) return null;
  const dob = new Date(dobString);
  if (Number.isNaN(dob.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

// --- check day for Step 2 form---
export function isFridayOrSaturday(dateString: string): boolean {
  if (!dateString) return false;
  const d = new Date(dateString + "T00:00:00");
  const day = d.getDay();
  return day === 5 || day === 6;
}

// check past date & 3 months future date
export const isPastDate = (dateString: string): boolean => {
  const date = new Date(`${dateString}T00:00:00`);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date < today;
};

export const isMoreThanDaysAway = (
  dateString: string,
  days: number,
): boolean => {
  const date = new Date(`${dateString}T00:00:00`);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + days);

  return date > maxDate;
};

export function formatTime12Hour(time: string): string {
  if (!time) return "—";

  const [hour, minute] = time.split(":");

  const date = new Date();
  date.setHours(Number(hour));
  date.setMinutes(Number(minute));

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
