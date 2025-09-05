import { Metadata } from 'next';
// import { notFound } from 'next/navigation';
// import { getUserById } from '@/lib/actions/user.actions';
// import UpdateAffiliate2Form from './update-affiliate2-form';
import { requireAdmin } from '@/lib/auth-guard';
import { getAffilateById } from '@/lib/actions/affiliate2.actions';
import QrCodeGenerator from './QrCodeGenerator';

export const metadata: Metadata = {
  title: 'Update Affilate',
};

const AdminAffiliateQRPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  await requireAdmin();

  const { id } = await props.params;
  console.log('Aff Id', id)
  // const user = await getUserById(id);
  const affiliate = await getAffilateById(id);
console.log('affiliate-Id', affiliate)
  // if (!user) notFound();
  const affiliateName = affiliate.name
  console.log('affiliateName', affiliateName)

  return (
    // <div className='space-y-8 max-w-lg mx-auto'>
    <div>
      {/* <h1 className='h2-bold'>QR Code Gen Affilaite</h1> */}
      {/* <UpdateAffiliate2Form user={user} /> */}
      {/* <UpdateAffiliate2Form affiliate={affiliate} /> */}
      <div className="relative min-h-[100vh] h-full flex justify-center items-center">
      <QrCodeGenerator id ={id} />
      </div>
    </div>
  );
};

export default AdminAffiliateQRPage;
