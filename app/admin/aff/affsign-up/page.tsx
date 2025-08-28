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
import Affiliate2SignUpForm from './affsign-up-form2';

export const metadata: Metadata = {
  title: 'Sign Up',
};

// const AdminAffiliateSignupPage = async (props: {
//   searchParams: Promise<{
//     page: string;
//     query: string;
//   }>;
// }) => {

const AdminAffiliateSignupPage = async () => {


  await requireAdmin();

  // const { page = '1', query: searchText } = await props.searchParams;

  return (
    <div className='w-full max-w-md mx-auto'>
      <Card>
        <CardHeader className='space-y-4'>
         
          <CardTitle className='text-center'>Create Affiliate Account</CardTitle>
          {/* <CardDescription className='text-center'>
            Enter your information below to sign up
          </CardDescription> */}
        </CardHeader>
        <CardContent className='space-y-4'>
          {/* <AffiliateSignUpForm /> */}

          <Affiliate2SignUpForm />
          
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAffiliateSignupPage;
