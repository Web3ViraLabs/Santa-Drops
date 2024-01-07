import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const AmountField = ({
  control,
  isLoading,
  placeholder,
  label,
}: {
  control: any;
  isLoading: boolean;
  placeholder: string;
  label?: string;
}) => {
  return (
    <FormField
      control={control}
      name="cryptocoin"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="uppercase text-sm dark:text-zinc-400">
            Amount
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              disabled={isLoading}
              className="w-full bg-main rounded-lg dark:border-[#303030]"
              autoComplete="off"
              value={field.value}
              onChange={field.onChange}
              placeholder={placeholder}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AmountField;
