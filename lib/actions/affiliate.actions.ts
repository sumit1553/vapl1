'use server';

import {
  // shippingAddressSchema,
  // signInFormSchema,
  // signUpFormSchema,
  // paymentMethodSchema,
  updateUserSchema,
  signUpAffiliateFormSchema,
} from '../validators';

// import { auth, signIn, signOut } from '@/auth';
import { auth } from '@/auth';

import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { hash } from '../encrypt';
import { prisma } from '@/db/prisma';
import { formatError } from '../utils';
// import { ShippingAddress } from '@/types';
import { z } from 'zod';
import { PAGE_SIZE } from '../constants';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';
// import { getMyCart } from './cart.actions';

// Sign in the user with credentials
// export async function signInWithCredentials(
//   prevState: unknown,
//   formData: FormData
// ) {
//   try {
//     const user = signInFormSchema.parse({
//       email: formData.get('email'),
//       password: formData.get('password'),
//     });

//     await signIn('credentials', user);

//     return { success: true, message: 'Signed in successfully' };
//   } catch (error) {
//     if (isRedirectError(error)) {
//       throw error;
//     }
//     return { success: false, message: 'Invalid email or password' };
//   }
// }




// Sign up Affiliate
export async function signUpAffiliate(prevState: unknown, formData: FormData) {
  try {
    const user = signUpAffiliateFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      role: formData.get('role'),
    });

    // const plainPassword = user.password;

    user.password = await hash(user.password);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        role:user.role,
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
  const affilate = await prisma.user.findFirst({
    where: { id: affilateId },
  });
  if (!affilate) throw new Error('Affilate not found');
  return affilate;
}







// Update the user profile
export async function updateProfile(user: { name: string; email: string }) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
    });

    if (!currentUser) throw new Error('User not found');

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name: user.name,
      },
    });

    return {
      success: true,
      message: 'User updated successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}




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

    
  const data = await prisma.user.findMany({
    // where: {
    //   ...queryFilter,
    // },
    where: { role: 'affiliate' },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: (page - 1) * limit,
  });

  const dataCount = await prisma.user.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}



// Delete a user
export async function deleteAffilate(id: string) {
  try {
    await prisma.user.delete({ where: { id } });

    revalidatePath('/admin/aff');

    return {
      success: true,
      message: 'User deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Update a user
export async function updateUser(user: z.infer<typeof updateUserSchema>) {
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        role: user.role,
      },
    });

    revalidatePath('/admin/users');

    return {
      success: true,
      message: 'User updated successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
