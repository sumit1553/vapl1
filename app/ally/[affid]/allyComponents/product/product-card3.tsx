import Link from 'next/link';
import Image from 'next/image';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import ProductPrice from './product-price';
import { Product } from '@/types';
// import Rating from './rating';
// import { Button } from '@/components/ui/button';
import {  Star } from 'lucide-react';
// import AddToCart from './add-to-cart';
// import { getMyCart2 } from '@/lib/actions/cart.actions';

const Badge: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs tracking-wide ${className}`}>{children}</span>
);


// const Button: React.FC<React.PropsWithChildren<{ onClick?: () => void; variant?: "primary" | "ghost" | "outline"; className?: string; as?: "button" | "a"; href?: string }> > = ({
//   children,
//   onClick,
//   variant = "primary",
//   className = "",
//   as = "button",
//   href,
// }) => {
//   const base = "rounded-2xl px-5 py-3 text-sm font-semibold transition shadow-sm";
//   const styles =
//     variant === "primary"
//       ? "bg-black text-white hover:bg-zinc-800"
//       : variant === "outline"
//       ? "border border-black text-black hover:bg-black hover:text-white"
//       : "text-black/80 hover:text-black";
//   if (as === "a" && href) {
//     return (
//       <a href={href} className={`${base} ${styles} ${className}`}>{children}</a>
//     );
//   }
//   return (
//     <button onClick={onClick} className={`${base} ${styles} ${className}`}>{children}</button>
//   );
// };





export default async function  ProductCard3 ({
  
  product,
  partnerId,
}: {
  
  product: Product;
  partnerId: string;

})  {

  

  // console.log('partnerId-cardpage2', partnerId)
  // console.log('producttt',product )

  // const cart = await getMyCart2(partnerId);  


  return (
    

    <div className="group rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Link href={`/ally/${partnerId}/product/${product.slug}`}>
              <Image src={product.images[0]} alt={product.name}  height='100' width='100' priority={true} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
            </Link>
            <div className="absolute left-3 bottom-3">
              <Badge className="bg-white/90">Inspired by</Badge>
            </div>
          </div>
    
    
    <div className="p-4">
          <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/ally/${partnerId}/product/${product.slug}`}>  
                      <h3 className="text-base font-semibold">{product.name}</h3>
                      </Link>
                      {/* <p className="text-xs text-zinc-500">{product.name}</p> */}
                    </div>
                    
                    <div className="flex items-center gap-1 text-amber-500 text-sm">
                      <Star size={16} fill="currentColor" className="-mt-px"/>
                      <span>{product.rating}</span>
                    </div>
          </div>
          
      {/* <p className="mt-2 text-sm text-zinc-600">{product.name}</p> */}
      
      {/* <div className="mt-4 flex items-center justify-between"> */}
        {/* <span className="text-lg font-bold">₹{product.price}</span> */}
        {/* <Button className="inline-flex items-center gap-2"><Droplets size={16}/> Add</Button> */}

        {/* <Button className="inline-flex items-center gap-2"><SprayCan size={16}/> Add</Button> */}

              {/* {product.stock > 0 && (
                  <div className='flex-center'>
                    <AddToCart
                      affid={partnerId}
                      cart={cart}
                      item={{
                        productId: product.id,
                        name: product.name,
                        slug: product.slug,
                        price: product.price,
                        qty: 1,
                        image: product.images![0],
                        affid: partnerId,
                      }}
                    />

                    
                  </div>
                )} */}

      {/* </div> */}
    </div>
  </div>
    

  );
};


