import Link from 'next/link';
import { getAllBottles, deleteBottle } from '@/lib/actions/bottles.actions';
import { formatId } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Pagination from '@/components/shared/pagination';
import DeleteDialog from '@/components/shared/delete-dialog';
import { requireAdmin } from '@/lib/auth-guard';

const AdminBottlesPage = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
    category: string;
  }>;
}) => {
  await requireAdmin();

  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || '';
  const category = searchParams.category || '';

  const bottles = await getAllBottles({
    query: searchText,
    page,
    category,
  });

  return (
    <div className='space-y-2'>
      <div className='flex-between'>
        <div className='flex items-center gap-3'>
          <h1 className='h2-bold'>Bottle</h1>
          {searchText && (
            <div>
              Filtered by <i>&quot;{searchText}&quot;</i>{' '}
              <Link href='/admin/bottles'>
                <Button variant='outline' size='sm'>
                  Remove Filter
                </Button>
              </Link>
            </div>
          )}
        </div>
        <Button asChild variant='default'>
          <Link href='/admin/bottles/create'>Create Bottle</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead className='text-right'>PRICE</TableHead>
            <TableHead>CATEGORY</TableHead>
            <TableHead>STOCK</TableHead>
            {/* <TableHead>RATING</TableHead> */}
            <TableHead className='w-[100px]'>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bottles.data.map((bottle) => (
            <TableRow key={bottle.id}>
              <TableCell>{formatId(bottle.id)}</TableCell>
              <TableCell>{bottle.name}</TableCell>
              <TableCell className='text-right'>
                {bottle.price}
              </TableCell>
              <TableCell>{bottle.category}</TableCell>
              <TableCell>{bottle.stock}</TableCell>
              {/* <TableCell>{bottle.rating}</TableCell> */}
              <TableCell className='flex gap-1'>
                <Button asChild variant='outline' size='sm'>
                  <Link href={`/admin/bottles/${bottle.id}`}>Edit</Link>
                </Button>
                <DeleteDialog id={bottle.id} action={deleteBottle} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {bottles.totalPages > 1 && (
        <Pagination page={page} totalPages={bottles.totalPages} />
      )}
    </div>
  );
};

export default AdminBottlesPage;
