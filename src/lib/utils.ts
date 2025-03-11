import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Merge Class Names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Time Ago Function
export const timeAgo = (timestemp: string) =>{
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - new Date(timestemp).getTime()) / 1000
  )

  // Intervals
  const intervals = [
    { label: "year", value: 60 * 60 * 24 * 365 },
    { label: "month", value: 60 * 60 * 24 * 30 },
    { label: "days", value: 60 * 60 * 24 },
    { label: "hours", value: 60 * 60 },
    { label: "mins", value: 60 },
    { label: "sec", value: 1 },
  ];
  
  // Loop through intervals
  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const count = Math.floor(diffInSeconds / interval.value);
  
    // If count is greater than or equal to 1, return the count and label
    if (count >= 1) {
      return `${count} ${interval.label} ago`;
    }
  }
  
  // If count is less than 1, return 'just now'
  return 'just now';
  
}