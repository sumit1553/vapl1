import Image from 'next/image';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
// import Menu from './menu';
import CategoryDrawer from './category-drawer';
import Menu2 from '@/components/shared/header/menu2';
// import Menu2 from './menu';
// import Search from './search';

const Header2 = ({
    affid,
}: {
    affid: string;

}) => {
  return (
    
    <header className='w-full border-b'>
      <div className='wrapper flex-between'>
        <div className='flex-start'>
          {/* <CategoryDrawer /> */}
          <CategoryDrawer  affid={affid}/>

          {/* <Link href='/' className='flex-start ml-4'> */}
          <Link href={`/ally/${affid}`} className='flex-start ml-4'>
            <Image
              src='/images/logo.svg'
              alt={`${APP_NAME} logo`}
              height={48}
              width={48}
              priority={true}
            />
            <span className='hidden lg:block font-bold text-2xl ml-3'>
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className='hidden md:block'>
          {/* <Search /> */}
        </div>
        <Menu2 affid={affid}/>
      </div>
    </header>
  );
};

export default Header2;
