'use server';

import {
  // shippingAddressSchema,
  // signInFormSchema,
  // signUpFormSchema,
  // paymentMethodSchema,
  // updateUserSchema,
  // updateAffiliateSchema,
  updateAffiliate2Schema,
  signUpAffiliate2FormSchema,
} from '../validators';

// import { auth, signIn, signOut } from '@/auth';
// import { auth } from '@/auth';

import { isRedirectError } from 'next/dist/client/components/redirect-error';
// import { hash } from '../encrypt';

import { prisma } from '@/db/prisma';
import { formatError } from '../utils';
// import { ShippingAddress } from '@/types';
import { z } from 'zod';
import { PAGE_SIZE } from '../constants';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';
// import { getMyCart } from './cart.actions';

import { hash } from '../encrypt';




// Sign up Affiliate
export async function signUpAffiliate(prevState: unknown, formData: FormData) {
  try {
    const affilate = signUpAffiliate2FormSchema.parse({
      name: formData.get('name'),
      phone: formData.get('phone'),
      // setuptype: formData.get('setuptype'),
      setuptype: formData.get('setuptype') as string,
      // password: formData.get('password'),
      // confirmPassword: formData.get('confirmPassword'),
      // role: formData.get('role'),
    });

    // const plainPassword = user.password;

    // user.password = await hash(user.password);

    await prisma.affiliate.create({
      data: {
        name: affilate.name,
        phone: affilate.phone,
        setuptype: affilate.setuptype,
        // password: user.password,
        // role:user.role,
      },
    });

    //test user add
    const affiliatepassword = await hash('abc123');
    await prisma.user.create({
      data: {
        name: affilate.name,
        email: affilate.phone,
        password: affiliatepassword,
      },
    });

    // await signIn('credentials', {
    //   email: user.email,
    //   password: plainPassword,
    // });

    return { success: true, message: 'Affiliate registered successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: formatError(error) };
  }
}




// Get user by the ID
export async function getAffilateById(affilateId: string) {
  const affilate = await prisma.affiliate.findFirst({
    where: { id: affilateId },
  });
  if (!affilate) throw new Error('Affilate not found');
  return affilate;
}

// Get user by the phone/email
export async function getAffilateByPhone(phone: string) {
  const affilate = await prisma.affiliate.findFirst({
    where: { phone: phone },
  });
  if (!affilate) throw new Error('Affilate not found');
  return affilate;
}







// Update the user profile
// export async function updateProfile(user: { name: string; email: string }) {
//   try {
//     const session = await auth();

//     const currentUser = await prisma.user.findFirst({
//       where: {
//         id: session?.user?.id,
//       },
//     });

//     if (!currentUser) throw new Error('User not found');

//     await prisma.user.update({
//       where: {
//         id: currentUser.id,
//       },
//       data: {
//         name: user.name,
//       },
//     });

//     return {
//       success: true,
//       message: 'User updated successfully',
//     };
//   } catch (error) {
//     return { success: false, message: formatError(error) };
//   }
// }




// Get all the Affilates
export async function getAllAffiliates({
  limit = PAGE_SIZE,
  page,
  query,
}: {
  limit?: number;
  page: number;
  query: string;
}) {
  const queryFilter: Prisma.UserWhereInput =
    query && query !== 'all'
      ? {
          name: {
            contains: query,
            mode: 'insensitive',
          } as Prisma.StringFilter,
        }
      : {};

  
      console.log(queryFilter)

  const data = await prisma.affiliate.findMany({
    // where: {
    //   ...queryFilter,
    // },
    // where: { role: 'affiliate' },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: (page - 1) * limit,
  });

  const dataCount = await prisma.affiliate.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}



// Delete a user
export async function deleteAffilate(id: string) {
  try {
    await prisma.affiliate.delete({ where: { id } });

    revalidatePath('/admin/aff');

    return {
      success: true,
      message: 'Affiliate deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Update a Affiliate
export async function updateAffiliate(affilate: z.infer<typeof updateAffiliate2Schema>) {
  try {
    await prisma.affiliate.update({
      where: { id: affilate.id },
      data: {
        name: affilate.name,
        phone: affilate.phone,
        setuptype: affilate.setuptype,
      },
    });

    revalidatePath('/admin/aff');

    return {
      success: true,
      message: 'Affiliate updated successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
