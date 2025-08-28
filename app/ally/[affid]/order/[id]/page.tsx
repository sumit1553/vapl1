import { Metadata } from 'next';
// import { getOrderById } from '@/lib/actions/order.actions';
import { getOrderById } from '@/lib/actions/order.actions2';
import { notFound, redirect } from 'next/navigation';
import OrderDetailsTable from './order-details-table';
// import { ShippingAddress } from '@/types';
import { auth } from '@/auth';
// import Stripe from 'stripe';

// import { Order } from '@/types';
// import { Order } from '@/types';

export const metadata: Metadata = {
  title: 'Order Details',
};

// interface OrderType {
//   order: Order
// }

const OrderDetailsPage = async (props: {
  params: Promise<{
    id: string;
    affid:string;
  }>;
}) => {
  const { id , affid} = await props.params;

  // console.log('AFFID Order', affid)
  
  const order  = await getOrderById(id, affid) ;
  console.log('Order-orpage', typeof(order), order ); 
  // const order = JSON.stringify(orderplaindata);
  if (!order) notFound();

  const session = await auth();

  // Redirect the user if they don't own the order
  if (order.userId !== session?.user.id && session?.user.role !== 'admin') {
    return redirect('/unauthorized');
  }

  // let client_secret = null;

  
  // Check if is not paid and using stripe
  // if (order.paymentMethod === 'Stripe' && !order.isPaid) {
  //   // Init stripe instance
  //   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    
  //   // Create payment intent
  //   const paymentIntent = await stripe.paymentIntents.create({
  //     amount: Math.round(Number(order.totalPrice) * 100),
  //     currency: 'USD',
  //     metadata: { orderId: order.id },
  //   });
  //   client_secret = paymentIntent.client_secret;
  // }

  return (
    // <OrderDetailsTable
    //   order={{
    //     ...order,
    //     shippingAddress: order.shippingAddress as ShippingAddress,
    //     // affid:order.affid as string,
    //   }}
    //   stripeClientSecret={client_secret}
    //   paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
    //   isAdmin={session?.user?.role === 'admin' || false}
    // />

    <OrderDetailsTable
      order={ order  }
      // stripeClientSecret={client_secret}
      paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
      isAdmin={session?.user?.role === 'admin' || false}
    />
  );
};

export default OrderDetailsPage;
