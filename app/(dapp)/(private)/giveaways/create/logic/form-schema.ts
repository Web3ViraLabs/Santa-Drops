import * as z from "zod";
import { MAX_DURATION_MS, MIN_DURATION_MS } from "./logic";

export const giveawayFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Giveaway title must be at least 2 characters.",
    })
    .max(40, {
      message: "Giveaway title must be less than 40 characters.",
    })
    .refine((value) => /^[a-zA-Z0-9_ ]+$/.test(value), {
      message:
        "Giveaway title must only contain alphanumeric characters and underscores.",
    }),
  imageUrl: z.string(),
  description: z.string().max(250, {
    message: "Giveaway description must be less than 250 characters.",
  }),
  endsAt: z.date().refine(
    (date) => {
      const now = new Date();
      const minDate = new Date(now.getTime() + MIN_DURATION_MS);
      const maxDate = new Date(now.getTime() + MAX_DURATION_MS);
      return date > minDate && date < maxDate;
    },
    {
      message: "End date must be at least 1 hour from now and within 6 months.",
    }
  ),
});

export const ParticipationFormSchema = z.object({
  twitterUrl: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value || /^https:\/\/twitter\.com\/[a-zA-Z0-9_]{1,15}$/i.test(value),
      {
        message:
          "Invalid twitter community url. Valid twitter account link starts from 'https://twitter.com/youraccount'.",
      }
    ),
  discordUrl: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^https:\/\/discord\.gg\/[a-zA-Z0-9]+$/i.test(value),
      {
        message:
          "Invalid discord community url. Please follow the format 'https://discord.gg/yourcommunity'. ",
      }
    ),
});

export const GiveawayTypeFormSchema = z.object({
  privateGiveaway: z.boolean().default(false),
});
