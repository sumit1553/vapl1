/* eslint-disable @typescript-eslint/no-explicit-any */

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getProductBySlug } from '@/lib/actions/product.actions';
import { notFound } from 'next/navigation';

// import ProductPrice from '@/components/shared/product/product-price';
// import ProductImages from '@/components/shared/product/product-images';
// import AddToCart from '@/components/shared/product/add-to-cart';
// import Rating from '@/components/shared/product/rating';

// import ProductPrice from '../../allyComponents/product/product-price';
import ProductImages from '../../allyComponents/product/product-images';
import AddToCart from '../../allyComponents/product/add-to-cart';
// import Rating from '../../allyComponents/product/rating';

import {  getMyCart2 } from '@/lib/actions/cart.actions';
import ReviewList from './review-list';
import { auth } from '@/auth';
// import { Button } from '@/components/ui/button';
import ImageSlider from '../../allyComponents/product/bottleSlider3';
import { getSelectedImage } from '@/lib/actions/selectBottle';
// import { getAllBottles, getTotalBottles } from '@/lib/actions/bottles.actions';
import { getTotalBottles } from '@/lib/actions/bottles.actions';



const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string, affid:string }>;
}) => {
  const { slug, affid } = await props.params;
  
  // console.log('add2cart-param', affid, typeof(affid))

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const session = await auth();
  const userId = session?.user?.id;

  // const cart = await getMyCart();
  const cart = await getMyCart2(affid);
// console.log('CART',cart)

const selectedBottle = await getSelectedImage();
// console.log('selectedBottle', selectedBottle)

const bottleImages = await getTotalBottles();
// console.log('bottleImages2', bottleImages.data);
const bottleImag:any = []
{bottleImages.data.map((xt)=>bottleImag.push(xt.images) )}

const imagelist:any = []
{bottleImag.map((ele:any) => {imagelist.push({src:ele[0], alt:'altimg', price:'100', volume:'10ml'})})}
// console.log('bottleImag',bottleImag)
// console.log('imagelist1', imagelist)

const imList:any = []
{bottleImages.data.map((xtt:any)=> {imList.push({src:xtt.images[0], alt:xtt.name, price:xtt.price, volume:xtt.volume})} )}
// console.log('imList', imList)

// const images = [
//     { src: "/images/bottlesimgs/b1.jpeg", alt: "Perfume 1" },
//     { src: "/images/bottlesimgs/b2.jpeg", alt: "Perfume 2" },
//     { src: "/images/bottlesimgs/b3.jpeg", alt: "Perfume 3" },
//     { src: "/images/bottlesimgs/b4.jpeg", alt: "Perfume 4" },
//     { src: "/images/bottlesimgs/b5.jpeg", alt: "Perfume 5" },
//     { src: "/images/bottlesimgs/b6.jpeg", alt: "Perfume 6" },
//     { src: "/images/bottlesimgs/b7.jpeg", alt: "Perfume 7" },
//     { src: "/images/bottlesimgs/b8.jpeg", alt: "Perfume 8" },
//   ];




  return (
    <>
      <section>
        <div className='grid grid-cols-1 md:grid-cols-6'>
              {/* Images Column */}
              <div className='col-span-1'>
                <ProductImages images={product.images} />
              </div>
          
              {/* Details Column */}
              <div className='col-span-4 p-5'>
                    <div className='flex flex-col gap-6'>
                        {/* <p>
                          {product.brand} {product.category}
                        </p> */}
                        
                        
                        <h1 className='h3-bold'><span><Badge className="bg-black/90">Inspired by</Badge> </span> {product.name}</h1>
                        {/* <Rating value={Number(product.rating)} />
                        <p>{product.numReviews} reviews</p> */}
                    
                    {/* <div className='flex flex-col sm:flex-row sm:items-center gap-3'>                      */}
                      {/* <ImageSlider images={images} /> */}
                      {/* <ImageSlider images={imagelist} /> */}
                      <ImageSlider images={imList} />

                      {/* {selected && (
                        <p className="mt-6 text-green-600 font-medium">
                          ✅ You selected: {selected}
                        </p>
                      )} */}
                    {/* </div> */}

                    <div className='flex flex-col sm:flex-row sm:items-center gap-3'>
                      {/* <ProductPrice
                        value={Number(product.price)}
                        className='w-24 rounded-full bg-green-100 text-green-700 px-5 py-2'
                      /> */}
                    </div>
                </div>


                <div className='mt-10'>
                    <p className='font-semibold'>Description</p>
                    <p>{product.description}</p>
                </div>
          </div>
          
          
          {/* Action Column */}
          <div className='col-span-1 p-5'>
            <Card>
              <CardContent className='p-4'>
                  <div className='mb-2 flex justify-between'>
                      <div>Price:</div> <Badge variant='secondary'>{selectedBottle.selectedPrice}</Badge>
                  </div>
                  <div className='mb-2 flex justify-between'>
                      <div>Volume:</div> <Badge variant='secondary'>{selectedBottle.selectedVolume}</Badge>
                  </div>
                  <div className='mb-2 flex justify-between'>
                  <div>Status</div>
                  {product.stock > 0 ? (
                    <Badge variant='outline'>In Stock</Badge>
                  ) : (
                    <Badge variant='destructive'>Out Of Stock</Badge>
                  )}
                  </div>
                  
                  
                  {product.stock > 0 && (
                  <div className='flex-center'>
                    <AddToCart
                      affid={affid}
                      cart={cart}
                      item={{
                        productId: product.id,
                        name: product.name,
                        slug: product.slug,
                        // price: product.price,
                        price:selectedBottle.selectedPrice as string,
                        volume:selectedBottle.selectedVolume as string,
                        bottleImage:selectedBottle.selectedImage as string,
                        qty: 1,
                        image: product.images![0],
                        affid: affid,
                      }}
                    /> 
                  </div>
                  
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className='mt-10'>
        <h2 className='h2-bold mb-5'>Customer Reviews</h2>
        <ReviewList
          userId={userId || ''}
          productId={product.id}
          productSlug={product.slug}
        />
      </section>
    </>
  );
};

export default ProductDetailsPage;
