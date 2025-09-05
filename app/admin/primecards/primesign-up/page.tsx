import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Metadata } from 'next';

// import Link from 'next/link';
// import Image from 'next/image';
// import { APP_NAME } from '@/lib/constants';
// import { auth } from '@/auth';
// import { redirect } from 'next/navigation';
// import AffiliateSignUpForm from './affsign-up-form';

import { requireAdmin } from '@/lib/auth-guard';
import PrimecardRegForm from './primecard-form';

export const metadata: Metadata = {
  title: 'Primecard Reg',
};

// const AdminAffiliateSignupPage = async (props: {
//   searchParams: Promise<{
//     page: string;
//     query: string;
//   }>;
// }) => {

const AdminPrimecardRegPage = async () => {


  await requireAdmin();

  // const { page = '1', query: searchText } = await props.searchParams;

  return (
    <div className='w-full max-w-md mx-auto'>
      <Card>
        <CardHeader className='space-y-4'>
         
          <CardTitle className='text-center'>Register Prime Card</CardTitle>
          {/* <CardDescription className='text-center'>
            Enter your information below to sign up
          </CardDescription> */}
        </CardHeader>
        <CardContent className='space-y-4'>
          {/* <AffiliateSignUpForm /> */}

          <PrimecardRegForm />
          
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPrimecardRegPage;
