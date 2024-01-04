import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormCard from "../form-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlockchainType, GiveawayType } from "@prisma/client";

const DynamicForm = ({
  control,
  isLoading,
  blockchainType,
  giveawayType,
}: {
  control: any;
  isLoading: boolean;
  blockchainType: BlockchainType;
  giveawayType: GiveawayType;
}) => {
  return (
    <FormCard>
      <FormField
        control={control}
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
      <FormField
        control={control}
        name="blockchainType"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="uppercase text-sm dark:text-zinc-400">
              Blockchain Type
            </FormLabel>
            <Select
              disabled={isLoading}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="bg-main border-0 focus-visible:ring-0 w-full focus-visible:ring-offset-0 capitalize dark:text-zinc-400 outline-none">
                  <SelectValue placeholder="Select blockchain type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-main border-[#303030]">
                {Object.values(BlockchainType).map((type) => (
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
    </FormCard>
  );
};

export default DynamicForm;
