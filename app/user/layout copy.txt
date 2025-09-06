// import { APP_NAME } from '@/lib/constants';
// import Image from 'next/image';
import Link from 'next/link';
// import Menu from '@/components/shared/header/menu';
import MainNav from './main-nav';
import Menu2 from '@/components/shared/header/menu2';



interface UserLayoutProps {
      children: React.ReactNode;
      // params: { affid: string };
      params: Promise<{ affid: string }>;
    }


// export default function UserLayout({
//   children,
//   params,
// }: Readonly<{
//   children: React.ReactNode;
//   params: {affid: string;}
// }>) {

export default async function UserLayout({ children, params }: UserLayoutProps) {

  const  {affid}  =   await params;
  console.log('Aff Id layout2', affid)
  return (
    <>
      <div className='flex flex-col'>
        <div className='border-b container mx-auto'>
          <div className='flex items-center h-16 px-4'>
            {/* <Link href='/' className='w-22'> */}
            <Link href={`/ally/${affid}`} className='w-22'>
              {/* <Image
                src='/images/logo.svg'
                height={48}
                width={48}
                alt={APP_NAME}
              /> */}
              <span className='hidden lg:block font-bold text-2xl ml-3'>
              VAPL
            </span>
            </Link>
            <MainNav className='mx-6' />
            <div className='ml-auto items-center flex space-x-4'>
              {/* <Menu /> */}
              <Menu2  affid={affid} />
            </div>
          </div>
        </div>

        <div className='flex-1 space-y-4 p-8 pt-6 container mx-auto'>
          {children}
        </div>
      </div>
    </>
  );
}
