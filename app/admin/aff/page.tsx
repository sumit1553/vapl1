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
import { deleteAffilate, getAllAffiliates } from '@/lib/actions/affiliate2.actions';

export const metadata: Metadata = {
  title: 'Admin Users',
};

const AdminAffiliatePage = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
  }>;
}) => {
  await requireAdmin();

  const { page = '1', query: searchText } = await props.searchParams;

  // const users = await getAllAffiliates({ page: Number(page), query: searchText });

  const affiliates = await getAllAffiliates({ page: Number(page), query: searchText });

  return (
    
    <div className='space-y-2'>
          <div className='flex items-center gap-3'>
            <h1 className='h2-bold'>Affiliates</h1>
            {searchText && (
              <div>
                Filtered by <i>&quot;{searchText}&quot;</i>{' '}
                <Link href='/admin/aff'>
                  <Button variant='outline' size='sm'>
                    Remove Filter
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className='flex align-right'>
            <Button asChild variant='outline' size='sm'>
                        <Link href={`/admin/aff/affsign-up`}>Add Affiliates</Link>
            </Button>
          </div>

          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>NAME</TableHead>
                  <TableHead>PHONE</TableHead>
                  <TableHead>TYPE</TableHead>
                  {/* <TableHead>ROLE</TableHead> */}
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {affiliates.data.map((affiliate) => (
                  <TableRow key={affiliate.id}>
                    <TableCell>{formatId(affiliate.id)}</TableCell>
                    <TableCell>{affiliate.name}</TableCell>
                    <TableCell>{affiliate.phone}</TableCell>
                    <TableCell>{affiliate.setuptype}</TableCell>
                    {/* <TableCell>
                      {user.role === 'user' ? (
                        <Badge variant='secondary'>User</Badge>
                      ) : (
                        <Badge variant='default'>Admin</Badge>
                      )}
                    </TableCell> */}

                    {/* <TableCell>
                       <Badge variant='default'>{user.role}</Badge> 
                    </TableCell> */}

                    <TableCell>
                      <Button asChild variant='outline' size='sm'>
                        <Link href={`/admin/aff/qr/${affiliate.id}`}>QR</Link>
                      </Button>
                      <Button asChild variant='outline' size='sm'>
                        <Link href={`/admin/aff/${affiliate.id}`}>Edit</Link>
                      </Button>
                      <DeleteDialog id={affiliate.id} action={deleteAffilate} />
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {affiliates.totalPages > 1 && (
              <Pagination page={Number(page) || 1} totalPages={affiliates?.totalPages} />
            )}
          </div>
    </div>
  );
};

export default AdminAffiliatePage;
