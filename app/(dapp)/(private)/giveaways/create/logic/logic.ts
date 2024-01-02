export const MIN_DURATION_MS = 1 * 60 * 60 * 1000;
export const MAX_DURATION_MS = 6 * 30 * 24 * 60 * 60 * 1000;

export const getDefaultEndAt = () => {
  const now = new Date();
  return new Date(now.getTime() + MIN_DURATION_MS);
};

export function formatDateToDateTimeLocal(date: Date) {
  const ten = (i: number) => (i < 10 ? "0" : "") + i;
  const YYYY = date.getFullYear();
  const MM = ten(date.getMonth() + 1);
  const DD = ten(date.getDate());
  const HH = ten(date.getHours());
  const mm = ten(date.getMinutes());
  return `${YYYY}-${MM}-${DD}T${HH}:${mm}`;
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
