import BottleForm from '@/components/admin/bottle-form';
import { getBottleById } from '@/lib/actions/bottles.actions';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/auth-guard';

export const metadata: Metadata = {
  title: 'Update Bottle',
};

const AdminBottleUpdatePage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  await requireAdmin();

  const { id } = await props.params;

  const bottle = await getBottleById(id);

  if (!bottle) return notFound();

  return (
    <div className='space-y-8 max-w-5xl mx-auto'>
      <h1 className='h2-bold'>Update Bottle</h1>

      <BottleForm type='Update' bottle={bottle} bottleId={bottle.id} />
    </div>
  );
};

export default AdminBottleUpdatePage;
