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
import { useLoginContext } from "./login-context";
import axios from "axios";

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
  signature,
  address,
}: {
  signature: string;
  address: string;
}) => {
  const { setSigned } = useLoginContext();

  const onClose = () => {
    setSigned(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      axios.post("/api/users", {
        signature,
        address,
        name: values.username,
      });
    } catch (error) {
      console.log(error);
      return "Internal error";
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
                      autoFocus
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="ml-3 flex w-full mt-5 items-center justify-around">
              <Button variant={"outline"} onClick={onClose}>
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
