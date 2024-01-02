import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { GiveawayTypeFormSchema } from '../logic/form-schema';
import * as z from 'zod';
import { Switch } from '@/components/ui/switch';
import useStore from '../logic/use-store';
import { updateSavedGiveaway } from '../actions/actions';
import { Type } from '@prisma/client';

const PrivateGiveaway = () => {
  const { savedGwId } = useStore();
  const form = useForm<z.infer<typeof GiveawayTypeFormSchema>>({
    resolver: zodResolver(GiveawayTypeFormSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  async function onSubmit(values: z.infer<typeof GiveawayTypeFormSchema>) {
    try {
      console.log(JSON.stringify(values, null, 2));
      const updatedGw = await updateSavedGiveaway({
        id: savedGwId,
        type: values.privateGiveaway ? Type.RESTRICTED : Type.PUBLIC,
      });

      console.log('[SAVE_GIVEAWAY_TYPE] ', updatedGw);
    } catch (error) {
      console.log('[SAVE_GIVEAWAY_TYPE] ', error);
    }
  }
  return (
    <div className="w-full lg:w-[60%] flex flex-col space-y-10 rounded-lg bg-background p-8 ml-8">
      <Form {...form}>
        <form
          onKeyDown={handleKeyDown}
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full"
        >
          <div className="flex w-full flex-col p-2 space-y-6 items-center ">
            <h1 className="text-2xl text-center">
              Public/Invite only Giveaway
            </h1>
            <FormField
              control={form.control}
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
          </div>
          {savedGwId && (
            <div className="flex mt-4">
              <Button type="submit">
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Save'
                )}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default PrivateGiveaway;
