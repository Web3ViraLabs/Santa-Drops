import * as z from "zod";
import axios from "axios";

export const MIN_DURATION_MS = 1 * 60 * 60 * 1000;
export const MAX_DURATION_MS = 6 * 30 * 24 * 60 * 60 * 1000;

export const getDefaultEndAt = (): Date => {
  const now = new Date();
  return new Date(now.getTime() + MIN_DURATION_MS + 3600);
};

export function formatDateToDateTimeLocal(date: Date) {
  const padWithZeros = (num: number) => (num < 10 ? "0" : "") + num;
  const year = date.getFullYear();
  const month = padWithZeros(date.getMonth() + 1);
  const day = padWithZeros(date.getDate());
  const hour = padWithZeros(date.getHours());
  const minute = padWithZeros(date.getMinutes());
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
  return "Invalid";
}

export function convertToHttpUrl(uri: string): string {
  console.log(uri);

  if (uri.startsWith("ipfs://")) {
    const ipfsHash = uri.replace(/^ipfs:\/\/(ipfs\/)*/, "");
    console.log(ipfsHash);

    return `https://ipfs.io/ipfs/${ipfsHash}`;
  }

  return uri;
}

export const validateField = (
  fieldName: any,
  value: any,
  schema: any
): { valid: boolean; error: z.ZodError | null } => {
  const fieldSchema = schema.shape[fieldName];
  if (fieldSchema) {
    const result = fieldSchema.safeParse(value);
    return result.success
      ? { valid: true, error: null }
      : { valid: false, error: result.error };
  }
  return { valid: false, error: new z.ZodError([]) };
};

export const fetchImage = async (url: string) => {
  try {
    const data = await axios.get(url);
    console.log(data.data);

    return data.data.image;
  } catch (error) {
    console.log("[FETCH_IMAGE_ERROR_FROM_URI] ", error);
  }
};
