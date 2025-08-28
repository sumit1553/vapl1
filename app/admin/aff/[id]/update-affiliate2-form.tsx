'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { updateAffiliate } from '@/lib/actions/affiliate2.actions';
// import { updateUser } from '@/lib/actions/user.actions';

// import { SETUP_TYPES, USER_ROLES } from '@/lib/constants';
import { SETUP_TYPES } from '@/lib/constants';
import { updateAffiliate2Schema } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { z } from 'zod';

const UpdateAffiliate2Form = ({
  affiliate,
}: {
  affiliate: z.infer<typeof updateAffiliate2Schema>;
}) => {
  
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateAffiliate2Schema>>({
    resolver: zodResolver(updateAffiliate2Schema),
    defaultValues: affiliate,
  });

  const onSubmit = async (values: z.infer<typeof updateAffiliate2Schema>) => {
    try {
      const res = await updateAffiliate({
        ...values,
        id: affiliate.id,
      });

      if (!res.success) {
        return toast({
          variant: 'destructive',
          description: res.message,
        });
      }

      toast({
        description: res.message,
      });
      form.reset();
      router.push('/admin/aff');
    } catch (error) {
      toast({
        variant: 'destructive',
        description: (error as Error).message,
      });
    }
  };

  return (
    <Form {...form}>
      <form method='POST' onSubmit={form.handleSubmit(onSubmit)}>
        
        {/* Name */}
        <div>
          <FormField
            control={form.control}
            name='name'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateAffiliate2Schema>,
                'name'
              >;
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter user name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Phone */}
        <div>
          <FormField
            control={form.control}
            name='phone'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateAffiliate2Schema>,
                'phone'
              >;
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={true}
                    placeholder='Enter Affiliate phone'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* Setup Type */}
        <div>
          <FormField
            control={form.control}
            name='setuptype'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateAffiliate2Schema>,
                'setuptype'
              >;
            }) => (
              <FormItem className='w-full'>
                <FormLabel>SetUp Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a Type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SETUP_TYPES.map((setuptype) => (
                      <SelectItem key={setuptype} value={setuptype}>
                        {setuptype.charAt(0).toUpperCase() + setuptype.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex-between mt-6'>
          <Button
            type='submit'
            className='w-full'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Submitting...' : 'Update Affiliate'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateAffiliate2Form;
