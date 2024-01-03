"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buttonVariants } from "@/components/ui/button";
import { UploadFile } from "@/components/uploadfile";
import { giveawayFormSchema } from "../../../logic/form-schema";
import {
  formatDateToDateTimeLocal,
  getDefaultEndAt,
  timeFromNow,
} from "../../../logic/logic";
import * as z from "zod";
import { Switch } from "@/components/ui/switch";
import { debounce } from "lodash";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GiveawayType } from "@prisma/client";

const validateField = (
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
  return { valid: false, error: new z.ZodError([]) }; // Returning an empty ZodError for consistency
};

const GiveawayMainForm = () => {
  const form = useForm<z.infer<typeof giveawayFormSchema>>({
    resolver: zodResolver(giveawayFormSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      description: "",
      endsAt: getDefaultEndAt(),
      // giveawayType: GiveawayType.TOKEN,
      privateGiveaway: false,
      discordUrl: "",
      twitterUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const {
    watch,
    formState: { isValid, isValidating, isSubmitted, isSubmitting },
  } = form;

  const formValues = watch();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const autosave = (data: z.infer<typeof giveawayFormSchema>) => {
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

  const debouncedSave = debounce(autosave, 1000);

  useEffect(() => {
    debouncedSave(formValues);

    return () => {
      debouncedSave.cancel();
    };
  }, [formValues]);

  async function onSubmit(values: z.infer<typeof giveawayFormSchema>) {
    try {
      console.log(JSON.stringify(values, null, 2));
    } catch (error) {
      console.log("[CREATE_TOKEN_GIVEAWAY_CLIENT] ", error);
    }
  }

  const giveawayType = watch("giveawayType");

  return (
    <div className="w-full lg:w-[60%] lg:ml-8 pb-20">
      <Form {...form}>
        <form
          onKeyDown={handleKeyDown}
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-10"
        >
          <div className="flex w-full flex-col space-y-4 items-center bg-background p-8 rounded-lg  ">
            <h1 className="text-2xl text-center">Giveaway form</h1>
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
                          : ""
                      } // Convert Date to 'YYYY-MM-DDTHH:mm' string
                      onChange={(e) => field.onChange(new Date(e.target.value))} // Convert string back to Date
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
          </div>
          <div className="flex w-full flex-col space-y-4 items-center bg-background p-8 rounded-lg  ">
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
                        <SelectValue placeholder="Select giveaway type" />
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
            {giveawayType === GiveawayType.TOKEN && (
              <div>I am going to be created soon</div>
            )}
          </div>
          <div className="flex w-full flex-col space-y-4 items-center bg-background p-8 rounded-lg">
            <FormField
              control={form.control}
              name="privateGiveaway"
              render={({ field }) => (
                <FormItem className="w-full flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Private Giveaway</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      className="bg-main border-none"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full flex-col space-y-4 items-center bg-background p-8 rounded-lg  ">
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
          <div className="w-full space-x-5">
            <button
              type="button"
              onClick={() => autosave(form.getValues())}
              className={cn(buttonVariants({ variant: "default" }), "ms-auto")}
            >
              Save (auto save on)
            </button>
            <button
              type="submit"
              className={cn(buttonVariants({ variant: "default" }), "ms-auto")}
            >
              Publish
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GiveawayMainForm;
