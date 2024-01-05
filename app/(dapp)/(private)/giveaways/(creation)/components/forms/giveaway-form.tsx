import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { UploadFile } from "@/components/uploadfile";
import { Loader2 } from "lucide-react";
import { giveawayFormSchema } from "../../(routes)/[giveawayId]/components/forms/logic/form-schema";
import {
  formatDateToDateTimeLocal,
  getDefaultEndAt,
  timeFromNow,
} from "../../(routes)/[giveawayId]/components/forms/logic/logic";
import * as z from "zod";
import { forwardRef } from "react";
import useStore from "../../(routes)/[giveawayId]/components/forms/logic/use-store";
import { saveGiveaway } from "../../actions/actions";

const GiveawayForm = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const { setSavedGwId } = useStore();
  const form = useForm<z.infer<typeof giveawayFormSchema>>({
    resolver: zodResolver(giveawayFormSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      description: "",
      endsAt: getDefaultEndAt(),
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof giveawayFormSchema>) {
    try {
      console.log(JSON.stringify(values, null, 2));
      const saveGw = await saveGiveaway({
        name: values.title,
        image: values.imageUrl,
        description: values.description,
        endsAt: values.endsAt,
      });

      if (!saveGw) {
        console.log("[GIVEAWAY_SAVE] error saving gw");
        return;
      }

      setSavedGwId(saveGw.id);
    } catch (error) {
      console.log("[CREATE_TOKEN_GIVEAWAY_CLIENT] ", error);
    }
  }
  return (
    <div className="w-full lg:w-[60%] flex flex-col space-y-10 rounded-lg bg-background p-8 ml-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-10"
        >
          <div className="flex w-full flex-col p-2 space-y-4 items-center ">
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
          <div className="flex">
            <Button type="submit">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
});

export default GiveawayForm;
