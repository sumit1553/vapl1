import { Metadata } from 'next';
import { getAllAffiliates, deleteAffilate } from '@/lib/actions/affiliate.actions';
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
import { Badge } from '@/components/ui/badge';
import DeleteDialog from '@/components/shared/delete-dialog';
import { requireAdmin } from '@/lib/auth-guard';

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

  const users = await getAllAffiliates({ page: Number(page), query: searchText });


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
                  <TableHead>EMAIL</TableHead>
                  <TableHead>ROLE</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.data.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{formatId(user.id)}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    {/* <TableCell>
                      {user.role === 'user' ? (
                        <Badge variant='secondary'>User</Badge>
                      ) : (
                        <Badge variant='default'>Admin</Badge>
                      )}
                    </TableCell> */}
                    <TableCell>
                       <Badge variant='default'>{user.role}</Badge> 
                       </TableCell>
                    <TableCell>
                      <Button asChild variant='outline' size='sm'>
                        <Link href={`/admin/aff/${user.id}`}>Edit</Link>
                      </Button>
                      <DeleteDialog id={user.id} action={deleteAffilate} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {users.totalPages > 1 && (
              <Pagination page={Number(page) || 1} totalPages={users?.totalPages} />
            )}
          </div>
    </div>
  );
};

export default AdminAffiliatePage;
