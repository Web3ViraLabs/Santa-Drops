import * as z from "zod";
import { debounce } from "lodash"; // assuming lodash is installed
import { giveawayFormSchema } from "./form-schema";
import { validateField } from "../../utils/utils";

interface TokenData {
  contractAddress: string;
  tokenName: string;
  tokenImage: string;
}

export const autosave = (
  id: string,
  data: z.infer<typeof giveawayFormSchema>,
  dynamicData: TokenData,
  isValidating: boolean,
  isSubmitting: boolean
) => {
  if (!isValidating && !isSubmitting) {
    let isAnyFieldValid = false;

    // Trim and validate static form data
    const trimmedData: any = {};
    Object.entries(data).forEach(([key, value]: any) => {
      const result = validateField(key, value, giveawayFormSchema);
      if (result.valid) {
        trimmedData[key] = typeof value === "string" ? value.trim() : value;
        isAnyFieldValid = true;
      }
    });

    const isDynamicDataValid = Object.values(dynamicData).every(
      (value) => value != null && value.trim() !== ""
    );

    const combinedData = isDynamicDataValid
      ? {
          ...trimmedData,
          ...dynamicData,
        }
      : trimmedData;

    if (isAnyFieldValid) {
      // const updated = await updateGiveaway(gwId, trimmedData);
      // if (updated) {
      //   console.log(
      //     "Auto-save successful to database.",
      //     JSON.stringify(updated, null, 2)
      //   );
      // }
      console.log("Auto-saving data:", JSON.stringify(combinedData, null, 2));
      // Implement the actual saving logic here...
    } else {
      console.log("No valid fields to save.");
    }
  }
};

export const debouncedSave = debounce(autosave, 1000);
