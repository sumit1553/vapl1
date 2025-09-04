
import { Product } from '@/types';
// import ProductCard2 from './product-card2';
import ProductCard3 from './product-card3';




export default function ProductList3 (
  {
    data,
    partnerId,
    limit,
}: {
    data: Product[];
    partnerId: string;
    limit?: number;

}) {
  
  const limitedData = limit ? data.slice(0, limit) : data;
  // console.log('Pro listpage2', partnerId)
  // console.log('ProductsData', data)


  return (
    <div className='my-10'>
      {/* <h2 className='h2-bold mb-4'> test product list - {partnerId}</h2> */}

      
      {data.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {limitedData.map((product: Product) => (
            
            <ProductCard3 key={product.slug} product={product} partnerId={partnerId}/>

          ))}
        </div>
      ) : (
        <div>
          <p>No products found</p>
        </div>
      )}

    </div>
  );
};

// export default ProductList;
