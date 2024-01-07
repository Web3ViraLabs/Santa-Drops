"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buttonVariants } from "@/components/ui/button";
import { giveawayFormSchema } from "./logic/form-schema";
import { getDefaultEndAt } from "../utils/utils";
import * as z from "zod";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { debouncedSave } from "./logic/auto-save";
import EngagmentForm from "./forms/engagment-form";
import PrivateGwForm from "./forms/private-gw-form";
import GiveawayForm from "./forms/giveaway-form";
import DynamicForm from "./forms/dynamic-form";
import { GiveawayType } from "@prisma/client";
import useStore from "./logic/use-store";

interface ValuesProps {
  title: string;
  imageUrl: string | null;
  description: string;
  endsAt: Date;
  privateGiveaway: boolean;
  discordUrl: string | null;
  twitterUrl: string | null;
}

const GiveawayMainForm = ({
  id,
  values,
}: {
  id: string;
  values: ValuesProps;
}) => {
  const form = useForm<z.infer<typeof giveawayFormSchema>>({
    resolver: zodResolver(giveawayFormSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      description: "",
      endsAt: getDefaultEndAt(),
      privateGiveaway: false,
      discordUrl: "",
      twitterUrl: "",
    },
  });

  useEffect(() => {
    Object.entries(values).forEach(([key, value]: any) => {
      console.log(key, value);

      form.setValue(key, value);
    });
  }, []);

  const isLoading = form.formState.isSubmitting;
  const { address, tokenData } = useStore();

  const {
    watch,
    register,
    unregister,
    formState: { isValidating, isSubmitting },
  } = form;

  const formValues = watch();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  useEffect(() => {
    const validateData = {
      tokenName: tokenData && tokenData.name ? tokenData.name : "",
      tokenImage: tokenData && tokenData.image ? tokenData.image : "",
      contractAddress: address || "",
    };
    debouncedSave(id, formValues, validateData, isValidating, isSubmitting);
    return () => {
      debouncedSave.cancel();
    };
  }, [formValues, tokenData, address]);

  async function onSubmit(values: z.infer<typeof giveawayFormSchema>) {
    try {
      console.log(JSON.stringify(values, null, 2));
    } catch (error) {
      console.log("[CREATE_TOKEN_GIVEAWAY_CLIENT] ", error);
    }
  }

  const giveawayType = watch("giveawayType");
  const blockchainType = watch("blockchainType");

  useEffect(() => {
    unregister("tokens");
    unregister("cryptocoin");
  }, [giveawayType]);

  useEffect(() => {
    if (giveawayType === GiveawayType.TOKEN) {
      register("tokens", {
        value: 0,
      });
      console.log("register amount");
    }
    if (giveawayType === GiveawayType.COIN) {
      register("cryptocoin", {
        value: 0,
      });
      console.log("register coin");
    }
  }, [giveawayType]);

  return (
    <div className="w-full lg:w-[60%] lg:ml-8 pb-20">
      <Form {...form}>
        <form
          onKeyDown={handleKeyDown}
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-10"
        >
          <GiveawayForm control={form.control} isLoading={isLoading} />
          <DynamicForm
            control={form.control}
            isLoading={isLoading}
            blockchainType={blockchainType}
            giveawayType={giveawayType}
          />
          <PrivateGwForm control={form.control} />
          <EngagmentForm control={form.control} isLoading={isLoading} />
          <div className="w-full space-x-5">
            {/* <button
              type="button"
              onClick={() =>
                autosave(
                  form.getValues(),
                  
                  form.formState.isValid,
                  form.formState.isSubmitting
                )
              }
              className={cn(buttonVariants({ variant: "default" }), "ms-auto")}
            >
              Save (auto save on)
            </button> */}
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
