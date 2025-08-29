// import ProductList from '@/components/shared/product/product-list';
// import {
//   getLatestProducts,
//   getFeaturedProducts,
// } from '@/lib/actions/product.actions';
// import ProductCarousel from '@/components/shared/product/product-carousel';
// import ViewAllProductsButton from '@/components/view-all-products-button';
// import IconBoxes from '@/components/icon-boxes';
// import DealCountdown from '@/components/deal-countdown';

// import MoodExplorer from "./landingpages/landingpage1";
// import MoodExplorer2 from "./landingpages/landingpage2";
// import MoodExplorer3 from "./landingpages/lp3";

import DossierStyleSite from "./landingpages/lp4";

const Homepage = async () => {
  // const latestProducts = await getLatestProducts();
  // const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {/* {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )} */}
      {/* <ProductList data={latestProducts} title='Newest Arrivals' limit={4} /> */}
      {/* <ViewAllProductsButton /> */}
      {/* <DealCountdown /> */}
      {/* <IconBoxes /> */}

      {/* <div>
        root page
      </div> */}

      {/* <MoodExplorer /> */}

      {/* <MoodExplorer2 /> */}

      {/* <MoodExplorer3 /> */}

      <DossierStyleSite />

    </>
  );
};

export default Homepage;
