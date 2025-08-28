import { auth } from '@/auth';
import {  getMyCart2 } from '@/lib/actions/cart.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ShippingAddress } from '@/types';
import ShippingAddressForm from './shipping-address-form';
import CheckoutSteps from '@/components/shared/checkout-steps';

export const metadata: Metadata = {
  title: 'Shipping Address',
};

// const ShippingAddressPage = async () => {

const ShippingAddressPage = async (props: {
  params: Promise<{ affid:string }>;
}) => {


  const {  affid } = await props.params;  
  // console.log('shipping-param', affid)



  // const cart = await getMyCart();
  const cart = await getMyCart2(affid);

  // if (!cart || cart.items.length === 0) redirect('/cart');
  if (!cart || cart.items.length === 0) redirect(`/ally/${affid}/cart`);

  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) throw new Error('No user ID');

  const user = await getUserById(userId);

  return (
    <>
      <CheckoutSteps current={1} />
      {/* <ShippingAddressForm address={user.address as ShippingAddress} /> */}
      <ShippingAddressForm affid={affid} address={user.address as ShippingAddress} />
    </>
  );
};

export default ShippingAddressPage;
