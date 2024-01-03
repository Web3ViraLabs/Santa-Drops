"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import initGiveaway from "./actions/action";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(40, {
      message: "Title must be less than 40 characters.",
    }),
  description: z.string().max(250, {
    message: "Description must be less than 250 characters.",
  }),
});

const Create = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newGw = await initGiveaway({
        name: values.title,
        description: values.description,
      });

      if (!newGw) {
        return console.log("[CREATE_NEW_GIVEAWAY_CLIENT] error initing gw");
      }

      form.reset();
      router.push(`/giveaways/${newGw.id}`);
    } catch (error) {
      console.log("[CREATE_NEW_GIVEAWAY_CLIENT] ", error);
    }
  }
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="flex flex-col space-y-6 lg:pr-40 justify-center">
        <h1 className="text-3xl ">Let's host you a giveaway</h1>
        <div className="flex shadow-sm flex-col p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="uppercase text-sm dark:text-zinc-400">
                        Title
                        <span className="text-red-500 mb-2 ml-1">*</span>
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
                          className="w-full bg-main rounded-lg ps-4 pt-2 dark:border dark:border-[#303030] focus:ring-2 focus:ring-[#7d5eda]  outline-none max-h-[200px] min-h-[100px]"
                          autoComplete="off"
                          disabled={isLoading}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Create a description for your giveaway (optional)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex">
                <Button
                  type="submit"
                  variant={"destructive"}
                  disabled={isLoading}
                  className="w-full lg:w-auto ms-auto"
                >
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
      </div>
    </div>
  );
};

export default Create;
