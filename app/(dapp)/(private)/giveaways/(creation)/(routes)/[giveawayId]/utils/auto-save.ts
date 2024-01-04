import { giveawayFormSchema } from "../../../logic/form-schema";
import { validateField } from "./field-validation";
import { debounce } from "lodash";
import * as z from "zod";

export const autosave = (
  data: z.infer<typeof giveawayFormSchema>,
  isValidating: boolean,
  isSubmitting: boolean
) => {
  if (!isValidating && !isSubmitting) {
    const trimmedData: any = {};
    let isAnyFieldValid = false;

    Object.entries(data).forEach(([key, value]: any) => {
      const result = validateField(key, value, giveawayFormSchema);
      if (result.valid) {
        trimmedData[key] = typeof value === "string" ? value.trim() : value;
        isAnyFieldValid = true;
      }
    });

    if (isAnyFieldValid) {
      console.log("Auto-saving data:", JSON.stringify(trimmedData, null, 2));
    }
  }
};

export const debouncedSave = debounce(autosave, 1000);
