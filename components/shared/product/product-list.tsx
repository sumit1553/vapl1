// import { Affiliate } from '@prisma/client';
import ProductCard from './product-card';
import { Product } from '@/types';
// import { Affiliate } from '@/types';

const ProductList = ({
  data,
  title,
  limit,
  // affiliate,
}: {
  data: Product[];
  title?: string;
  limit?: number;
  // affiliate: Affiliate;
}) => {
  const limitedData = limit ? data.slice(0, limit) : data;
  console.log('ProdCard', limitedData)

  return (
    <div className='my-10'>
      <h2 className='h2-bold mb-4'>{title}</h2>
      {data.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {limitedData.map((product: Product) => (
            <ProductCard key={product.slug} product={product} />

            // <ProductCard key={product.slug} product={product} affiliate={affiliate} />
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

export default ProductList;
