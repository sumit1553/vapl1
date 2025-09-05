'use server';

import {
  // shippingAddressSchema,
  // signInFormSchema,
  // signUpFormSchema,
  // paymentMethodSchema,
  // updateUserSchema,
  // updateAffiliateSchema,
  updatePrimecardSchema,
  PrimecardFormSchema,
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

// import { hash } from '../encrypt';




// Register Primecard
export async function registerPrimecard(prevState: unknown, formData: FormData) {
  try {
    const primecard = PrimecardFormSchema.parse({
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      alt_phone_1: formData.get('alt_phone_1'),
      card_no: formData.get('card_no'),
      issuedDate: formData.get('issuedDate'),
      expiryDate: formData.get('expiryDate'),
      discountOffered: formData.get('discountOffered'),
      current_Occup: formData.get('current_Occup'),
      address: formData.get('address'),
      city: formData.get('city'),
      state: formData.get('state'),
      country: formData.get('country'),
      zipcode: formData.get('zipcode'),
      // isActive: formData.get('isActive'),
      
    });



    await prisma.primecard.create({
      data: {
        name: primecard.name,
        phone: primecard.phone,
        email: primecard.email,
        alt_phone_1: primecard.alt_phone_1,
        card_no: primecard.card_no,
        issuedDate: primecard.issuedDate,
        expiryDate: primecard.expiryDate,
        discountOffered: primecard.discountOffered,
        current_Occup: primecard.current_Occup,
        address: primecard.address,
        city: primecard.city,
        state: primecard.state,
        country: primecard.country,
        zipcode: primecard.zipcode,
        // isActive: primecard.isActive,

      },
    });

   

    return { success: true, message: 'primeCard registered successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: formatError(error) };
  }
}




// Get user by the ID
export async function getPrimecardById(primecardId: string) {
  const primecard = await prisma.primecard.findFirst({
    where: { id: primecardId },
  });
  if (!primecard) throw new Error('Primecard not found');
  return primecard;
}

// Get user by the phone/email
export async function getPrimecardByPhone(phone: string) {
  const primecard = await prisma.primecard.findFirst({
    where: { phone: phone },
  });
  if (!primecard) throw new Error('Affilate not found');
  return primecard;
}









// Get all the Affilates
export async function getAllPrimecards({
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

  const data = await prisma.primecard.findMany({
    // where: {
    //   ...queryFilter,
    // },
    // where: { role: 'affiliate' },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: (page - 1) * limit,
  });

  const dataCount = await prisma.primecard.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}



// Delete a Primecard
export async function deletePrimecard(id: string) {
  try {
    await prisma.primecard.delete({ where: { id } });

    revalidatePath('/admin/primecards');

    return {
      success: true,
      message: 'Primecard deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Update a Primecard
export async function updatePrimecard(primecard: z.infer<typeof updatePrimecardSchema>) {
  try {
    await prisma.primecard.update({
      where: { id: primecard.id },
      data: {
        name: primecard.name,
        phone: primecard.phone,
        email: primecard.email,
        alt_phone_1: primecard.alt_phone_1,
        card_no: primecard.card_no,
        issuedDate: primecard.issuedDate,
        expiryDate: primecard.expiryDate,
        discountOffered: primecard.discountOffered,
        current_Occup: primecard.current_Occup,
        address: primecard.address,
        city: primecard.city,
        state: primecard.state,
        country: primecard.country,
        zipcode: primecard.zipcode,
        // isActive: primecard.isActive,
      },
    });

    revalidatePath('/admin/primecards');

    return {
      success: true,
      message: 'Primecard updated successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
