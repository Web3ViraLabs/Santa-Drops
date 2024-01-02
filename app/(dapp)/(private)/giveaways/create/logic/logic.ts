export const MIN_DURATION_MS = 1 * 60 * 60 * 1000;
export const MAX_DURATION_MS = 6 * 30 * 24 * 60 * 60 * 1000;

/**
 * Returns the default end date/time.
 * The default end date/time is calculated by adding the minimum duration to the current date/time.
 * @returns {Date} The default end date/time.
 */
export const getDefaultEndAt = (): Date => {
  const now = new Date();
  return new Date(now.getTime() + MIN_DURATION_MS);
};

/**
 * Formats a given date to a string in the format "YYYY-MM-DDTHH:mm",
 * suitable for input in a datetime-local input element.
 *
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string.
 */
export function formatDateToDateTimeLocal(date: Date) {
  // Function to pad a number with leading zeros if it is less than 10.
  const padWithZeros = (num: number) => (num < 10 ? "0" : "") + num;

  // Extract the year, month, day, hour, and minute from the date.
  const year = date.getFullYear();
  const month = padWithZeros(date.getMonth() + 1);
  const day = padWithZeros(date.getDate());
  const hour = padWithZeros(date.getHours());
  const minute = padWithZeros(date.getMinutes());

  // Return the formatted date string.
  return `${year}-${month}-${day}T${hour}:${minute}`;
}
export function timeFromNow(date: Date) {
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  const mins = Math.round(diff / 60000);
  const hours = Math.round(mins / 60);
  const days = Math.round(hours / 24);
  const months = Math.round(days / 30.44);

  if (months > 0) return `${months} month${months > 1 ? "s" : ""} from now`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} from now`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} from now`;
  if (mins > 0) return `${mins} minute${mins > 1 ? "s" : ""} from now`;
  return "";
}
