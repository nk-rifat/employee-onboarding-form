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
