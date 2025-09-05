'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {  primecardDefaultValues } from '@/lib/constants';
// import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
// import { signUpAffiliate } from '@/lib/actions/affiliate.actions';

import { registerPrimecard } from '@/lib/actions/primecard.actions';

// import { useSearchParams } from 'next/navigation';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Checkbox } from '@/components/ui/checkbox';


const PrimecardRegForm = () => {
  const [data, action] = useActionState(registerPrimecard, {
    success: false,
    message: '',
  });

  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get('callbackUrl') || '/';

  const RegisterButton = () => {
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
            defaultValue={primecardDefaultValues.name}
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
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            type='text'
            // autoComplete='email'
            // defaultValue={signUpDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor='alt_phone_1'>Alt Phone</Label>
          <Input
            id='alt_phone_1'
            name='alt_phone_1'
            type='text'
            // autoComplete='email'
            // defaultValue={signUpDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor='card_no'>Card No</Label>
          <Input
            id='card_no'
            name='card_no'
            type='text'
            // autoComplete='email'
            // defaultValue={signUpDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor='issuedDate'>Issue Dt</Label>
          <Input
            id='issuedDate'
            name='issuedDate'
            type='text'
            // autoComplete='email'
            // defaultValue={signUpDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor='expiryDate'>Expiry Dt</Label>
          <Input
            id='expiryDate'
            name='expiryDate'
            type='text'
            // autoComplete='email'
            // defaultValue={signUpDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor='discountOffered'>Discount</Label>
          <Input
            id='discountOffered'
            name='discountOffered'
            type='text'
            // autoComplete='email'
            // defaultValue={signUpDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor='current_Occup'>Occupation</Label>
          <Input
            id='current_Occup'
            name='current_Occup'
            type='text'
            // autoComplete='email'
            // defaultValue={signUpDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor='address'>Address</Label>
          <Input
            id='address'
            name='address'
            type='text'
            // autoComplete='email'
            // defaultValue={signUpDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor='city'>City</Label>
          <Input
            id='city'
            name='city'
            type='text'
            // autoComplete='email'
            // defaultValue={signUpDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor='state'>State</Label>
          <Input
            id='state'
            name='state'
            type='text'
            // autoComplete='email'
            // defaultValue={signUpDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor='zipcode'>Zipcode</Label>
          <Input
            id='zipcode'
            name='zipcode'
            type='text'
            // autoComplete='email'
            // defaultValue={signUpDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor='country'>Country</Label>
          <Input
            id='country'
            name='country'
            type='text'
            // autoComplete='email'
            // defaultValue={signUpDefaultValues.email}
          />
        </div>
         
        
        <div>
          <RegisterButton />
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

export default PrimecardRegForm;
