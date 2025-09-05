

import DossierStyleSite from "./landingpages/lp4";
import { ParallaxImage } from "./lpage2/slp1";

const Homepage = async () => {
  

  return (
    <>
      

      

       {/* Hero.tsx (inside motion.div for bottle image) */}
      <ParallaxImage src="/images/garden.png" alt="Perfume bottles" />
      <DossierStyleSite />


    </>
  );
};

export default Homepage;
