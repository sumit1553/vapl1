// import Header from '@/components/shared/header';
import Footer from '@/components/footer';
import Header2 from './allyComponents/header';


interface LayoutProps {
      children: React.ReactNode;
      // params: { affid: string };
      params: Promise<{ affid: string }>;
    }



// export default function RootLayout({
//   children,
//   params,
  
// }: Readonly<{
//   children: React.ReactNode; 
//   params: {affid: string;}
// }>


export default async function RootLayout({ children, params }: LayoutProps) {

  const  {affid}  =  await params;
  // console.log('Aff Id layout', affid)

  
  return (
    <div className='flex h-screen flex-col'>
      {/* <Header /> */}
      <Header2 affid={affid} />
      <main className='flex-1 wrapper'>{children}</main>
      <Footer />
    </div>
  );
}
