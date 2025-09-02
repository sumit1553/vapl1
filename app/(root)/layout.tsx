// import Header from '@/components/shared/header';
import Footer from '@/components/footer';
import Header2 from '@/components/header2';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-screen flex-col'>
      {/* <Header /> */}
      <Header2 />
      <main className='flex-1 wrapper'>{children}</main>
      <Footer />
    </div>
  );
}
