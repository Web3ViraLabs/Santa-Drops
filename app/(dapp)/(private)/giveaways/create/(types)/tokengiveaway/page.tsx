"use client";

import * as z from "zod";
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
import { Button } from "@/components/ui/button";
import { UploadFile } from "@/components/uploadfile";
import { FileDiff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  MAX_DURATION_MS,
  MIN_DURATION_MS,
  formatDateToDateTimeLocal,
  getDefaultEndAt,
  timeFromNow,
} from "../../logic/logic";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

type BlockChainType = "ethereum" | "solana" | "polygon" | "bitcoin";

enum Blockchain {
  Ethereum = "ethereum",
  Solana = "solana",
  Polygon = "polygon",
  Bitcoin = "bitcoin",
}

const blockchains: BlockChainType[] = [
  "ethereum",
  "solana",
  "polygon",
  "bitcoin",
];
const CreateGiveaway = () => {
  const router = useRouter();
  const [selectedBlockchain, setSelectedBlockchain] =
    useState<BlockChainType | null>(null);

  const formSchema = z.object({
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
        message:
          "End date must be at least 1 hour from now and within 6 months.",
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
            "Invalid twitter community url. Valid twitter account link starts from 'https://twitter.com/youraccount'.",
        }
      ),
    discordUrl: z
      .string()
      .optional()
      .refine(
        (value) =>
          !value || /^https:\/\/discord\.gg\/[a-zA-Z0-9]+$/i.test(value),
        {
          message:
            "Invalid discord community url. Please follow the format 'https://discord.gg/yourcommunity'. ",
        }
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      description: "",
      discordUrl: "",
      twitterUrl: "",
      endsAt: getDefaultEndAt(),
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(JSON.stringify(values, null, 2));
    } catch (error) {
      console.log("[CREATE_TOKEN_GIVEAWAY_CLIENT] ", error);
    }
  }

  console.log("selectedBlockchain", selectedBlockchain);

  return (
    <>
      <div className="w-full flex items-center space-x-4">
        {!selectedBlockchain &&
          blockchains.map((blockchain) => (
            <Card
              key={blockchain}
              className="w-[250px] h-[200px] bg-background border-none transition transform hover:scale-105 flex flex-row space-x-3 items-center p-4 hover:opacity-70"
              onClick={() => setSelectedBlockchain(blockchain)}
            >
              <CardContent>
                <h1 className="text-2xl">{blockchain}</h1>
              </CardContent>
            </Card>
          ))}
      </div>
      {selectedBlockchain && (
        <div className="flex flex-col space-y-4 rounded-lg w-full h-full overflow-y-auto bg-main p-2 pr-8 ">
          <div className="flex flex-col items-center space-y-6">
            <h1 className="text-4xl pl-4 pt-4">Create Giveaway</h1>
            <p className="text-zinc-400">
              Create giveaway for your community, we manage it for you
            </p>
          </div>
          <div className="w-full flex p-4 lg:p-0">
            <div className="w-full lg:w-[60%] flex flex-col space-y-10 rounded-lg bg-background p-8 ml-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-10"
                >
                  <div className="flex w-full flex-col p-2 space-y-4 items-center ">
                    <h1 className="text-2xl">
                      Selected chain: {selectedBlockchain}
                    </h1>
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="uppercase text-sm dark:text-zinc-400">
                            Token Contract address
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
                      name="title"
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
                              placeholder="My Giveaway"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                    {/* <FormField
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
                /> */}

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
                        "Create giveaway"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
            <div className="w-[40%] hidden lg:flex rounded-md bg-background shadow-md p-4 ml-4">
              <h2 className="text-3xl">Preview</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateGiveaway;
