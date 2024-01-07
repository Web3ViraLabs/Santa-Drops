import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import FormCard from "../form-card";

const PrivateGwForm = ({ control }: { control: any }) => {
  return (
    <FormCard>
      <FormField
        control={control}
        name="privateGiveaway"
        render={({ field }) => (
          <FormItem className="w-full flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>Private Giveaway</FormLabel>
            </div>
            <FormControl>
              <Switch
                className="bg-main border-none"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </FormCard>
  );
};

export default PrivateGwForm;
