// import Image from 'next/image';
import Link from 'next/link';

// import { APP_NAME } from '@/lib/constants';
// import Menu from './shared/header/menu';

// import { Button } from './ui/button';
// import { ShoppingCart } from 'lucide-react';
import UserButton from './shared/header/user-button';
// import Menu from './menu';
// import CategoryDrawer from './category-drawer';
// import Search from './search';

const Header2 = () => {

    const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
    );
    


  return (
    
    // <header className='w-full border-b'>
    //   <div className='wrapper flex-between'>
    //     <div className='flex-start'>
         
    //       {/* <CategoryDrawer /> */}

    //       <Link href='/' className='flex-start ml-4'>
    //         <Image
    //           src='/images/logo.svg'
    //           alt={`${APP_NAME} logo`}
    //           height={48}
    //           width={48}
    //           priority={true}
    //         />
    //         <span className='hidden lg:block font-bold text-2xl ml-3'>
    //           {APP_NAME}
    //         </span>
    //       </Link>
    //     </div>
        
    //     <div className='hidden md:block'>
    //       {/* <Search /> */}
    //     </div>
    //     <Menu />
    //   </div>
    // </header>


    <header className="sticky top-0 z-40 w-full backdrop-blur bg-white/70 border-b">
    <Container className="flex h-16 items-center justify-between">
      
      {/* <a href="#" className="text-xl font-bold tracking-tight">QV</a> */}
       <Link href='/' className='flex-start ml-4'>
            {/* <Image
              src='/images/logo.svg'
              alt='qvlogo'
              height={48}
              width={48}
              priority={true}
            /> */}
            <span className='hidden lg:block font-bold text-2xl ml-3'>
              VAPL
            </span>
          </Link>

      <nav className="hidden md:flex items-center gap-6 text-sm">
        <a href="#about" className="hover:opacity-70">About</a>
        <a href="#explore" className="hover:opacity-70">Explore</a>
        {/* <a href="#discovery" className="hover:opacity-70">Discovery Set</a> */}
        <a href="#values" className="hover:opacity-70">Our Values</a>
        <a href="#contact" className="hover:opacity-70">Contact</a>
      </nav>
      <div className="flex items-center gap-3">
        {/* <ModeToggle /> */}
        {/* <Button variant="outline" className="hidden sm:inline-flex">Sign In</Button> */}
        {/* <Button className="inline-flex items-center gap-2"><ShoppingCart size={18}/> Cart</Button> */}
        <UserButton />
      </div>
    </Container>
  </header>




  );
};

export default Header2;
