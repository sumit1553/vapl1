import { Metadata } from 'next';
import BottleForm from '@/components/admin/bottle-form';
import { requireAdmin } from '@/lib/auth-guard';
export const metadata: Metadata = {
  title: 'Create Bottle',
};

const CreateBottlePage = async () => {
  await requireAdmin();
  return (
    <>
      <h2 className='h2-bold'>Create Bottle</h2>
      <div className='my-8'>
        <BottleForm type='Create' />
      </div>
    </>
  );
};

export default CreateBottlePage;
