import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useLoginContext } from "../context/login-context";
import { useState } from "react";
import { useModal } from "@/hooks/use-modal";
import { useWallet } from "@solana/wallet-adapter-react";
import useLoginStore from "../config/login-store";
import { createAccount, existAddress, existUser } from "./actions";
import { Symbol } from "@prisma/client";
import { cookies } from "next/headers";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(15, {
      message: "Username must be less than 15 characters.",
    }),
});

const LoginCard = ({
  address,
  symbol,
}: {
  address: string;
  symbol: Symbol;
}) => {
  const [error, setError] = useState("");
  const { login } = useLoginContext();
  const { onClose: closeModal } = useModal();
  const { disconnect } = useWallet();
  const { setCurrentAddress, currentAddress, setSigned, reset, signature } =
    useLoginStore();

  const onClose = () => {
    disconnect();
    reset();
    closeModal();
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const userNameExist = await existUser(values.username);

    if (userNameExist === true) {
      setError(`Username ${values.username} has been taken`);
      return;
    }

    const isAddressRegistered = await existAddress(address);

    if (isAddressRegistered === true) {
      setError(`Address ${address} has been registered`);
      return;
    }

    const account = await createAccount({
      address,
      name: values.username,
      symbol,
      signature,
    });

    if (account) {
      onClose();
    } else {
      setError(
        "Something went wrong. Please try again later. If the problem persists, please contact us."
      );
    }
  }

  return (
    <div className="flex flex-col items-center space-y-5">
      <div>
        <h3 className="text-2xl font-semibold ">Continue account creation</h3>
      </div>
      <div className="flex flex-col space-y-4 items-center justify-center">
        <span className="mx-auto">Your address is: </span>
        <span className=" bg-[#7d5eda]/40 px-4 py-0.5 rounded-lg">
          {address.replace(/^(.{4}).*(.{4})$/, "$1...$2")}
        </span>
      </div>
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sm text-zinc-400">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="px-4 py-6 bg-[#7d5eda]/10 rounded-lg"
                      autoComplete="off"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Username"
                    />
                  </FormControl>
                  <FormMessage />
                  {error && <p className="text-red-500">{error}</p>}
                </FormItem>
              )}
            />
            <div className="ml-3 flex w-full mt-5 items-center justify-around">
              <Button
                variant={"outline"}
                type="button"
                onClick={() => {
                  setSigned(false);
                  setCurrentAddress(currentAddress);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="px-10 dark:text-white">
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginCard;
