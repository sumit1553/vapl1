import { auth } from '@/auth';
import {  getMyCart2 } from '@/lib/actions/cart.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { ShippingAddress } from '@/types';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import CheckoutSteps from '@/components/shared/checkout-steps';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import PlaceOrderForm from './place-order-form';

export const metadata: Metadata = {
  title: 'Place Order',
};

// const PlaceOrderPage = async () => {

const PlaceOrderPage = async (
  props: {
  params: Promise<{ affid:string }>;
}) => {

  const {affid} = await props.params;

  // const cart = await getMyCart();
  const cart = await getMyCart2(affid);
  // console.log('carT', cart) working
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error('User not found');

  const user = await getUserById(userId);

  // if (!cart || cart.items.length === 0) redirect('/cart');
  // if (!user.address) redirect('/shipping-address');
  // if (!user.paymentMethod) redirect('/payment-method');

  if (!cart || cart.items.length === 0) redirect(`/ally/${affid}/cart`);
  if (!user.address) redirect(`/ally/${affid}/shipping-address`);
  if (!user.paymentMethod) redirect(`/ally/${affid}/payment-method`);

  const userAddress = user.address as ShippingAddress;

  return (
    <>
      <CheckoutSteps current={3} />
      <h1 className='py-4 text-2xl'>Place Order</h1>
      <div className='grid md:grid-cols-3 md:gap-5'>
        <div className='md:col-span-2 overflow-x-auto space-y-4'>
          <Card>
            <CardContent className='p-4 gap-4'>
              <h2 className='text-xl pb-4 font-bold'>Shipping Address</h2>
              <p>{userAddress.fullName}</p>
              <p>
                {userAddress.streetAddress},
              </p>
              <p>
                {userAddress.city}{'-'}{userAddress.postalCode}, {userAddress.country}{' '}
              </p>
              <p>{userAddress.shippingPhone}</p>
              <div className='mt-3'>
                {/* <Link href='/shipping-address'> */}
                <Link href={`/ally/${affid}/shipping-address`}>
                  <Button variant='outline'>Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4 gap-4'>
              <h2 className='text-xl pb-4 font-bold'>Payment Method</h2>
              <p>{user.paymentMethod}</p>
              <div className='mt-3'>
                {/* <Link href='/payment-method'> */}
                <Link href={`/ally/${affid}/payment-method`}>
                  <Button variant='outline'>Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4 gap-4'>
              <h2 className='text-xl pb-4 font-bold'>Order Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='text-center'>Item</TableHead>
                    <TableHead className='text-center'>Name</TableHead>
                     <TableHead className='text-center'>Qty</TableHead>
                    <TableHead className='text-center'>Volume</TableHead>
                    <TableHead className='text-center'>Price</TableHead>
                    <TableHead className='text-center'>Bottle</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.items.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell className='text-center'>
                        {/* <Link
                          href={`/ally/${affid}/product/${item.slug}`}
                          className='flex items-center'
                        > */}
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            className='justify-center'
                          />
                          
                        {/* </Link> */}
                      </TableCell>
                      <TableCell className='text-center'>
                        <span className='px-2'>{item.name}</span>
                      </TableCell>
                      <TableCell className='text-center'>
                        <span className='px-2'>{item.qty}</span>
                      </TableCell>
                      <TableCell className='text-center'>
                        <span className='px-2'>{item.volume}</span>
                      </TableCell>
                      <TableCell className='text-center'>
                        {formatCurrency(item.price)}
                      </TableCell>
                      <TableCell className='text-center'>
                          <Image
                            src={item.bottleImage}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className='p-4 gap-4 space-y-4'>
              <div className='flex justify-between'>
                <div>Items</div>
                <div>{formatCurrency(cart.itemsPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div>Gift Pack</div>
                <div>{formatCurrency(cart.taxPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div>Shipping</div>
                <div>{formatCurrency(cart.shippingPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div>Total</div>
                <div>{formatCurrency(cart.totalPrice)}</div>
              </div>
              {/* <PlaceOrderForm /> */}

              <PlaceOrderForm affid={affid}/>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;
