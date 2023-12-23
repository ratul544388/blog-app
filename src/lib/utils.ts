import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatText(text: string) {
  return text.toUpperCase().split("")[0] + text.toLowerCase().slice(1);
}

export function isValidObjectId(id: string) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}