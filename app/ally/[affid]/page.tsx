import { Metadata } from 'next';
// import { notFound } from 'next/navigation';

// import { getUserById } from '@/lib/actions/user.actions';
// import UpdateAffiliate2Form from './update-affiliate2-form';
// import { requireAdmin } from '@/lib/auth-guard';
import { getAffilateById } from '@/lib/actions/affiliate2.actions';


import {
  getLatestProducts,
  getFeaturedProducts,
} from '@/lib/actions/product.actions';


import ProductCarousel from './allyComponents/product/product-carousel';



// import ViewAllProductsButton from './allyComponents/view-all-products-button';

// import IconBoxes from '@/components/icon-boxes';
// import DealCountdown from '@/components/deal-countdown';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Affiliate } from '@/types';
import ProductList2 from './allyComponents/product/product-list2';

export const metadata: Metadata = {
  title: 'Affilate',
};

const AffiliateShopPage = async (props: {
  params: Promise<{
    affid: string;
  }>;
}) => {
  

  const { affid } = await props.params;
  // console.log('Aff Id', affid)
  
  const affiliate = await getAffilateById(affid) as Affiliate ;
  // console.log('affiliate-Id', affiliate)
  // console.log('Ally-ID', affiliate.id)
  


  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();


  return (
   <>
      
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      
      

      <ProductList2 data={latestProducts} partnerId={affiliate.id} limit={4}  />

      

       <div className='flex justify-center items-center my-8'>
      <Button asChild className='px-8 py-4 text-lg font-semibold'>
        {/* <Link href='/search'>View All Products Aff</Link> */}
        <Link href={`${affiliate.id}/search`}>View All Perfumeszz</Link>
      </Button>
    </div>


      {/* <ViewAllProductsButton /> */}



      {/* <DealCountdown /> */}

      {/* <IconBoxes /> */}
    </>
  );
};

export default AffiliateShopPage;
