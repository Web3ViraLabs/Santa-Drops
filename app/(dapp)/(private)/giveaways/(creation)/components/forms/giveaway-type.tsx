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
import { Loader2 } from "lucide-react";
import { ParticipationFormSchema } from "../../(routes)/[giveawayId]/components/forms/logic/form-schema";
import * as z from "zod";
import useBlockchain from "../../(routes)/[giveawayId]/components/forms/logic/use-store";
import useStore from "../../(routes)/[giveawayId]/components/forms/logic/use-store";
import { updateSavedGiveaway } from "../../actions/actions";

const GiveawayType = () => {
  const { savedGwId } = useStore();
  const form = useForm<z.infer<typeof ParticipationFormSchema>>({
    resolver: zodResolver(ParticipationFormSchema),
    defaultValues: {
      discordUrl: "",
      twitterUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  async function onSubmit(values: z.infer<typeof ParticipationFormSchema>) {
    try {
      console.log(JSON.stringify(values, null, 2));
      const updatedGw = await updateSavedGiveaway({
        id: savedGwId,
        discordUrl: values.discordUrl,
      });

      if (!updatedGw) {
        console.log("[GIVEAWAY_SAVE] error saving gw");
        return;
      }

      console.log("[SAVE_GIVEAWAY] ", updatedGw);
    } catch (error) {
      console.log("[CREATE_PARTICIPANTS_CLIENT] ", error);
    }
  }
  return (
    <div className="w-full lg:w-[60%] flex flex-col space-y-10 rounded-lg bg-background p-8 ml-8">
      <Form {...form}>
        <form
          onKeyDown={handleKeyDown}
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-10"
        >
          {/* TODO: Create a dropdown here to select the type of giveaway
            ex: <Token />
            <Crypto />
            <Nft />
            <Whitelist />
            <allowlist></allowlist>*/}
          <div className="flex w-full flex-col p-2 space-y-4 items-center ">
            <h1 className="text-2xl text-center">GIveaway Product</h1>
            <FormField
              control={form.control}
              name="twitterUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="uppercase text-sm dark:text-zinc-400">
                    type of Giveaway
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      className="w-full bg-main rounded-lg dark:border-[#303030]"
                      autoComplete="off"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="DropDown to select type of giveaway"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {savedGwId && (
            <div className="flex">
              <Button type="submit">
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default GiveawayType;
