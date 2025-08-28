import CartTable from './cart-table';
import {  getMyCart2 } from '@/lib/actions/cart.actions';

export const metadata = {
  title: 'Shopping Cart',
};

// const CartPage = async () => {


const CartPage = async (props: {
  params: Promise<{ affid:string }>;
}) => {

  const {  affid } = await props.params;  
  // console.log('cart-param', affid)

  // const cart = await getMyCart();

  const cart = await getMyCart2(affid);

  return (
    <>
      {/* <CartTable cart={cart} /> */}
      <CartTable cart={cart} affid={affid}/>
    </>
  );
};

export default CartPage;
