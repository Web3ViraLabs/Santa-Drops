'use client';

import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { GiveawayType } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UploadFile } from '@/components/uploadfile';
import { createGiveaway } from './actions/actions';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const MIN_DURATION_MS = 1 * 60 * 60 * 1000;
const MAX_DURATION_MS = 6 * 30 * 24 * 60 * 60 * 1000;

/**
 * Returns the default end date/time.
 * The default end date/time is calculated by adding the minimum duration to the current date/time.
 * @returns {Date} The default end date/time.
 */
const getDefaultEndAt = (): Date => {
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
function formatDateToDateTimeLocal(date: Date) {
  // Function to pad a number with leading zeros if it is less than 10.
  const padWithZeros = (num: number) => (num < 10 ? '0' : '') + num;

  // Extract the year, month, day, hour, and minute from the date.
  const year = date.getFullYear();
  const month = padWithZeros(date.getMonth() + 1);
  const day = padWithZeros(date.getDate());
  const hour = padWithZeros(date.getHours());
  const minute = padWithZeros(date.getMinutes());

  // Return the formatted date string.
  return `${year}-${month}-${day}T${hour}:${minute}`;
}

/**
 * Calculate the time difference between the given date and the current date.
 * Returns a string representing the time from now.
 * @param {Date} date - The date to calculate the time difference from.
 * @returns {string} - The time from now.
 */
function timeFromNow(date: Date) {
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  const mins = Math.round(diff / 60000);
  const hours = Math.round(mins / 60);
  const days = Math.round(hours / 24);
  const months = Math.round(days / 30.44);

  if (months > 0) return `${months} month${months > 1 ? 's' : ''} from now`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} from now`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} from now`;
  if (mins > 0) return `${mins} minute${mins > 1 ? 's' : ''} from now`;
  return '';
}

// Define the form schema using zod
const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Giveaway title must be at least 2 characters.',
    })
    .max(40, {
      message: 'Giveaway title must be less than 40 characters.',
    })
    .refine((value) => /^[a-zA-Z0-9_ ]+$/.test(value), {
      message:
        'Giveaway title must only contain alphanumeric characters and underscores.',
    }),
  imageUrl: z.string(), // The URL of the giveaway image
  description: z.string().max(250, {
    message: 'Giveaway description must be less than 250 characters.',
  }),
  giveawayType: z.nativeEnum(GiveawayType), // The type of the giveaway
  amount: z
    .string({
      required_error: 'Giveaway amount is required', // Error message when amount is not provided
      description: 'Giveaway amount', // Description of the giveaway amount
      invalid_type_error: 'Giveaway amount must be a number', // Error message when amount is not a number
    })
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: 'Giveaway amount is required', // Error message when amount is not provided
    })
    .refine((val) => parseInt(val, 10) > 0, {
      message: 'Giveaway amount must be greater than 0', // Error message when amount is less than or equal to 0
    })
    .refine((val) => parseInt(val, 10) <= 100000, {
      message: 'Giveaway amount must be less than or equal to 100000', // Error message when amount is greater than 100000
    }),
  endsAt: z.date().refine(
    (date) => {
      const now = new Date();
      const minDate = new Date(now.getTime() + MIN_DURATION_MS);
      const maxDate = new Date(now.getTime() + MAX_DURATION_MS);
      return date > minDate && date < maxDate;
    },
    {
      message: 'End date must be at least 1 hour from now and within 6 months.', // Error message when the end date is not within the specified range
    }
  ),
  twitterUrl: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value || /^https:\/\/twitter\.com\/[a-zA-Z0-9_]{1,15}$/i.test(value),
      {
        message:
          "Invalid twitter community url. Valid twitter account link starts from 'https://twitter.com/youraccount'.", // Error message when the twitter URL is not in the correct format
      }
    ),
  discordUrl: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^https:\/\/discord\.gg\/[a-zA-Z0-9]+$/i.test(value),
      {
        message:
          "Invalid discord community url. Please follow the format 'https://discord.gg/yourcommunity'. ", // Error message when the discord URL is not in the correct format
      }
    ),
});

const CreateGiveaway = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      imageUrl: '',
      description: '',
      giveawayType: 'TOKENS',
      amount: '',
      discordUrl: '',
      twitterUrl: '',
      endsAt: getDefaultEndAt(),
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(JSON.stringify(values, null, 2));
      const giveaway = await createGiveaway({
        name: values.title,
        description: values.description,
        image: values.imageUrl,
        giveawayType: values.giveawayType,
        amount: parseInt(values.amount),
        endsAt: values.endsAt,
        discordUrl: values.discordUrl === undefined ? null : values.discordUrl!,
        twitterUrl: values.twitterUrl === undefined ? null : values.twitterUrl!,
      });

      if (giveaway) {
        form.reset();
        router.push('/giveaway/' + giveaway.id);
      }
    } catch (error) {
      console.log('[CREATE_GIVEAWAY_CLIENT] ', error);
    }
  }
  return (
    <div className="flex flex-col space-y-4 rounded-lg w-full h-full overflow-y-auto bg-main p-2 pr-8 ">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-4xl pl-4 pt-4">Create Giveaway</h1>
        <p className="text-zinc-400">
          Create giveaway for your community, we manage it for you
        </p>
      </div>

      <div className="w-full flex p-4 lg:p-0">
        {/* Create Giveaway form */}
        <div className="w-full lg:w-[60%]  pb-20">
          <div className="flex flex-row space-y-10 rounded-lg bg-background p-8 ml-8 mb-6">
            {/* Token Details Form 01*/}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-10"
              >
                <div className="flex w-full flex-col p-2 space-y-4 items-center ">
                  <FormField
                    control={form.control}
                    name="tokencontractaddress"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-sm dark:text-zinc-400">
                          Token Contract Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isLoading}
                            className="w-full bg-main rounded-lg dark:border-[#303030]"
                            autoComplete="off"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="ex: 0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* TODO: Token Name will be fetched from the Contract address and will be shown here*/}
                  <FormField
                    control={form.control}
                    name="tokenname"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-sm dark:text-zinc-400">
                          Token Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isLoading}
                            className="w-full bg-main rounded-lg dark:border-[#303030]"
                            autoComplete="off"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="ex: Shiba Inu"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-sm dark:text-zinc-400">
                          Token Logo
                        </FormLabel>
                        <FormControl>
                          <UploadFile
                            endpoint="giveawayImage"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex">
                  <Button type="submit">
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Create giveaway'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          {/* Giveaway Details Form 02*/}
          <div className="flex flex-col space-y-10 rounded-lg bg-background p-8 ml-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-10"
              >
                <div className="flex w-full flex-col p-2 space-y-4 items-center ">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-sm dark:text-zinc-400">
                          Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isLoading}
                            className="w-full bg-main rounded-lg dark:border-[#303030]"
                            autoComplete="off"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="My Giveaway"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-sm dark:text-zinc-400">
                          COVER IMAGE
                        </FormLabel>
                        <FormControl>
                          <UploadFile
                            endpoint="giveawayImage"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-sm dark:text-zinc-400">
                          Description
                        </FormLabel>
                        <FormControl>
                          <textarea
                            rows={3}
                            cols={20}
                            {...field}
                            className="w-full bg-main rounded-lg dark:border-[#303030] ps-4 pt-2 focus:ring-2 ring-[#7d5eda] border-none outline-none max-h-[200px] min-h-[100px]"
                            autoComplete="off"
                            disabled={isLoading}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Create a description for your giveaway"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-sm dark:text-zinc-400">
                          Amount
                        </FormLabel>
                        <FormControl>
                          <Input
                            min={0}
                            type="number"
                            {...field}
                            disabled={isLoading}
                            className="w-full bg-main rounded-lg dark:border-[#303030]"
                            autoComplete="off"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="$100"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="giveawayType"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-sm dark:text-zinc-400">
                          Giveaway Type
                        </FormLabel>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-main border-0 focus-visible:ring-0 w-full focus-visible:ring-offset-0 capitalize dark:text-zinc-400 outline-none">
                              <SelectValue placeholder="Select channel type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-main border-[#303030]">
                            {Object.values(GiveawayType).map((type) => (
                              <SelectItem
                                key={type}
                                value={type}
                                className="capitalize bg-main"
                              >
                                {type.toLowerCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endsAt"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-sm dark:text-zinc-400">
                          DURATION ({timeFromNow(field.value)})
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={
                              field.value
                                ? formatDateToDateTimeLocal(field.value)
                                : ''
                            } // Convert Date to 'YYYY-MM-DDTHH:mm' string
                            onChange={(e) =>
                              field.onChange(new Date(e.target.value))
                            } // Convert string back to Date
                            disabled={isLoading}
                            className="w-full bg-main rounded-lg dark:border-[#303030]"
                            autoComplete="off"
                            type="datetime-local"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="twitterUrl"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-sm dark:text-zinc-400">
                          Twitter Community
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isLoading}
                            className="w-full bg-main rounded-lg dark:border-[#303030]"
                            autoComplete="off"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="https://twitter.com/username"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discordUrl"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-sm dark:text-zinc-400">
                          Discord Server
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isLoading}
                            className="w-full bg-main rounded-lg dark:border-[#303030]"
                            autoComplete="off"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="https://discord.gg/cool-people"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex">
                  <Button type="submit">
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Create giveaway'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        <div className="w-[40%] hidden lg:flex rounded-md bg-background shadow-md p-4 ml-4">
          <h2 className="text-3xl">Preview</h2>
        </div>
      </div>
    </div>
  );
};

export default CreateGiveaway;
