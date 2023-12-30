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

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Giveaway title must be at least 2 characters.",
    })
    .max(15, {
      message: "Giveaway title must be less than 15 characters.",
    })
    .refine((value) => /^[a-zA-Z0-9_]+$/.test(value), {
      message:
        "Giveaway title must only contain alphanumeric characters and underscores.",
    }),
  description: z.string().max(250, {
    message: "Giveaway description must be less than 250 characters.",
  }),
  type: z.enum(["tokens", "nft", "coins"]),
  amount: z
    .string({
      required_error: "Giveaway amount is required",
      description: "Giveaway amount",
    })
    .min(1, { message: "Giveaway amount must be at least $1." })
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
});

const CreateGiveaway = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "tokens",
      amount: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
        <div className="w-full lg:w-[60%] flex flex-col space-y-10 rounded-lg bg-background p-8 ml-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-10"
            >
              <div className="flex w-full flex-col p-2 items-center ">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="uppercase text-sm text-zinc-400">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-[#7d5eda]/10 rounded-lg border-[#303030]"
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
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="uppercase text-sm text-zinc-400">
                        Description
                      </FormLabel>
                      <FormControl>
                        <textarea
                          rows={3}
                          cols={20}
                          {...field}
                          className="w-full bg-[#7d5eda]/10 rounded-lg border-[#303030] ps-4 pt-2 focus:ring-2 ring-[#7d5eda] border-none outline-none"
                          autoComplete="off"
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
                      <FormLabel className="uppercase text-sm text-zinc-400">
                        Amount
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="w-full bg-[#7d5eda]/10 rounded-lg border-[#303030]"
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
              </div>
              <div className="flex">
                <Button type="submit">Create giveaway</Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="w-[40%] hidden lg:flex rounded-md bg-background shadow-md p-4 ml-4">
          <h2 className="text-3xl">Preview</h2>
        </div>
      </div>
    </div>
  );
};

export default CreateGiveaway;
