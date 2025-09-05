import { Metadata } from 'next';
// import { notFound } from 'next/navigation';
// import { getUserById } from '@/lib/actions/user.actions';
import UpdateAffiliate2Form from './update-affiliate2-form';
import { requireAdmin } from '@/lib/auth-guard';
import { getAffilateById } from '@/lib/actions/affiliate2.actions';
// import { Affiliate } from '@prisma/client';
import { Affiliate } from '@/types';

export const metadata: Metadata = {
  title: 'Update Affilate',
};

const AdminUserUpdatePage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  
  await requireAdmin();

  const { id } = await props.params;
  console.log('Aff Id', id)
  // const user = await getUserById(id);

  const affiliate = await getAffilateById(id) as Affiliate ;
  // const affiliate = await getAffilateById(id) ;
console.log('affiliate-Id-admin', affiliate)
  // if (!user) notFound();

  return (
    <div className='space-y-8 max-w-lg mx-auto'>
      <h1 className='h2-bold'>Update Affilaite</h1>
      {/* <UpdateAffiliate2Form user={user} /> */}
      <UpdateAffiliate2Form affiliate={affiliate}  />
      
    </div>
  );
};

export default AdminUserUpdatePage;
