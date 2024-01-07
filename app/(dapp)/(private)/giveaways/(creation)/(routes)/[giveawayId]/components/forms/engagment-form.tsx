import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormCard from "../form-card";

const EngagmentForm = ({
  control,
  isLoading,
}: {
  control: any;
  isLoading: boolean;
}) => {
  return (
    <FormCard>
      <FormField
        control={control}
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
        control={control}
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
    </FormCard>
  );
};

export default EngagmentForm;
