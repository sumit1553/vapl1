'use client';

import { useRouter } from 'next/navigation';
import { Check, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
// import { createOrder } from '@/lib/actions/order.actions';
import { createOrder } from '@/lib/actions/order.actions2';



// const PlaceOrderForm = () => {


const PlaceOrderForm = ({  affid}: {affid: string; }) => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('affid-pcOrder', affid)
    const res = await createOrder(affid);  //issue here
    console.log('res', res)

    if (res.redirectTo) {
      // router.push(res.redirectTo);
      router.push(`/ally/${affid}/${res.redirectTo}`);
    }
  };


  
  const PlaceOrderButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className='w-full'>
        {pending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Check className='w-4 h-4' />
        )}{' '}
        Place Order
      </Button>
    );
  };

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <PlaceOrderButton />
    </form>
  );
};

export default PlaceOrderForm;
