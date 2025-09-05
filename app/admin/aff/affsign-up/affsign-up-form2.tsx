'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SETUP_TYPES, signUpDefaultValues } from '@/lib/constants';
// import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
// import { signUpAffiliate } from '@/lib/actions/affiliate.actions';
import { signUpAffiliate } from '@/lib/actions/affiliate2.actions';
// import { useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


const Affiliate2SignUpForm = () => {
  const [data, action] = useActionState(signUpAffiliate, {
    success: false,
    message: '',
  });

  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get('callbackUrl') || '/';

  const SignUpButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className='w-full' variant='default'>
        {pending ? 'Submitting...' : 'Create'}
      </Button>
    );
  };

  return (
    <form action={action}>
      {/* <input type='hidden' name='callbackUrl' value={callbackUrl} /> */}
      {/* <input type='hidden' name='role' value='affiliate' /> */}
      <input type='hidden' name='id'  />
      <div className='space-y-6'>
        <div>
          <Label htmlFor='email'>Name</Label>
          <Input
            id='name'
            name='name'
            type='text'
            autoComplete='name'
            defaultValue={signUpDefaultValues.name}
          />
        </div>
        <div>
          <Label htmlFor='phone'>Phone</Label>
          <Input
            id='phone'
            name='phone'
            type='text'
            // autoComplete='email'
            // defaultValue={signUpDefaultValues.email}
          />
        </div>
        
        <div>
          <Label htmlFor='setuptype'>Sponsoror Type</Label>
          {/* <Input
            id='setuptype'
            name='setuptype'
            type='text'
            required
          /> */}

          <Select  name='setuptype'>
                              <SelectTrigger>
                                <SelectValue placeholder='Select a Type' />
                              </SelectTrigger>
                            <SelectContent>
                              {SETUP_TYPES.map((setuptype) => (
                                <SelectItem key={setuptype} value={setuptype}>
                                  {setuptype.charAt(0).toUpperCase() + setuptype.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
        </div>
        
        {/* <div>
          <Label htmlFor='confirmPassword'>Confirm Password</Label>
          <Input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            required
            autoComplete='confirmPassword'
            defaultValue={signUpDefaultValues.confirmPassword}
          />
        </div> */}
        
        <div>
          <SignUpButton />
        </div>

        {data && !data.success && (
          <div className='text-center text-destructive'>{data.message}</div>
        )}

        {/* <div className='text-sm text-center text-muted-foreground'>
          Already have an account?{' '}
          <Link href='/sign-in' target='_self' className='link'>
            Sign In
          </Link>
        </div> */}
      </div>
    </form>
  );
};

export default Affiliate2SignUpForm;
