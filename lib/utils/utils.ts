import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomElement<T>(array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined; // Handle empty array case
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
