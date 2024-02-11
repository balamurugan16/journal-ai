import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateString(str: string, length: number) {
  if (str.length > length) {
    return str.slice(0, length) + "..."
  }
  return str;
}

export function formatTimestamp(date: Date) {
  const today = (new Date()).toDateString();
  let options: Intl.DateTimeFormatOptions;
  if (today === date.toDateString()) {
    options = {
      hour: "numeric",
      minute: "numeric"
    }
  } else {
    options = {
      year: "2-digit",
      month: "long",
      day: "2-digit",
      weekday: "long"
    }
  }
  const formatter = new Intl.DateTimeFormat(undefined, options)
  return formatter.format(date)
}
