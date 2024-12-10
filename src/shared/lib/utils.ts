import { type ClassValue, clsx } from 'clsx';
import { format, isToday, isTomorrow, isYesterday } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateToString(date: Date) {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
}

// Function to format the date
export const dateFormatter = (date: Date) => {
  const day = format(date, 'dd');
  const month = format(date, 'MMM');

  if (isToday(date)) return { color: 'text-black', text: 'Today' };
  if (isTomorrow(date)) return { color: 'text-primary', text: 'Tomorrow' };
  if (isYesterday(date))
    return { color: 'text-destructive', text: 'Yesterday' };
  return { color: 'text-muted-foreground', text: `${day} ${month}` };
};

export function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
}

// Utility function to check if URL is an image
export function isImageURL(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
}

// Helper function to format the date
export function formatDateShort(timestamp: string | null): string {
  if (!timestamp) return 'Unknown Date';
  const date = new Date(timestamp);
  return format(date, 'dd MMM yyyy');
}
