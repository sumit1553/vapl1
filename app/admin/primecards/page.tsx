import { Metadata } from 'next';
// import { getAllAffiliates, deleteAffilate } from '@/lib/actions/affiliate.actions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatId } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Pagination from '@/components/shared/pagination';
// import { Badge } from '@/components/ui/badge';
import DeleteDialog from '@/components/shared/delete-dialog';
import { requireAdmin } from '@/lib/auth-guard';

import { deletePrimecard, getAllPrimecards } from '@/lib/actions/primecard.actions';

export const metadata: Metadata = {
  title: 'Prime Users',
};

const AdminPrimeuserPage = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
  }>;
}) => {
  await requireAdmin();

  const { page = '1', query: searchText } = await props.searchParams;

  // const users = await getAllAffiliates({ page: Number(page), query: searchText });

  const primecards = await getAllPrimecards({ page: Number(page), query: searchText });

  return (
    
    <div className='space-y-2'>
          <div className='flex items-center gap-3'>
            <h1 className='h2-bold'>Prime Users</h1>
            {searchText && (
              <div>
                Filtered by <i>&quot;{searchText}&quot;</i>{' '}
                <Link href='/admin/primecards'>
                  <Button variant='outline' size='sm'>
                    Remove Filter
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className='flex align-right'>
            <Button asChild variant='outline' size='sm'>
                        <Link href={`/admin/primecards/primesign-up`}>Add Prime card</Link>
            </Button>
          </div>

          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>NAME</TableHead>
                  <TableHead>PHONE</TableHead>
                  <TableHead>EMAIL</TableHead>
                  <TableHead>DISCOUNT</TableHead>
                  <TableHead>ISSUE DT</TableHead>
                  <TableHead>EXPIRY DT</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {primecards.data.map((primecard) => (
                  <TableRow key={primecard.id}>
                    <TableCell>{formatId(primecard.id)}</TableCell>
                    <TableCell>{primecard.name}</TableCell>
                    <TableCell>{primecard.phone}</TableCell>
                    <TableCell>{primecard.email}</TableCell>
                    <TableCell>{primecard.discountOffered}</TableCell>
                    <TableCell>{primecard.issuedDate}</TableCell>
                    <TableCell>{primecard.expiryDate}</TableCell>
                    <TableCell>
                      {/* <Button asChild variant='outline' size='sm'>
                        <Link href={`/admin/aff/qr/${affiliate.id}`}>QR</Link>
                      </Button> */}
                      <Button asChild variant='outline' size='sm'>
                        <Link href={`/admin/aff/${primecard.id}`}>Edit</Link>
                      </Button>
                      <DeleteDialog id={primecard.id} action={deletePrimecard} />
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {primecards.totalPages > 1 && (
              <Pagination page={Number(page) || 1} totalPages={primecards?.totalPages} />
            )}
          </div>
    </div>
  );
};

export default AdminPrimeuserPage;
