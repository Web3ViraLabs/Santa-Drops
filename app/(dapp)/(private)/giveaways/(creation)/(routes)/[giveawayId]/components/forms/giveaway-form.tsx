import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadFile } from "@/components/uploadfile";
import {
  formatDateToDateTimeLocal,
  timeFromNow,
} from "../../../../logic/logic";
import FormCard from "../form-card";

const GiveawayForm = ({
  control,
  isLoading,
}: {
  control: any;
  isLoading: boolean;
}) => {
  return (
    <FormCard>
      <h1 className="text-2xl text-center">Giveaway form</h1>
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
                  field.value ? formatDateToDateTimeLocal(field.value) : ""
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
    </FormCard>
  );
};

export default GiveawayForm;
