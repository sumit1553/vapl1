'use server';
import { prisma } from '@/db/prisma';
import { convertToPlainObject, formatError } from '../utils';
import { LATEST_BOTTLES_LIMIT, PAGE_SIZE } from '../constants';
import { revalidatePath } from 'next/cache';
import { insertBottleSchema, updateBottleSchema } from '../validators';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

// Get latest bottles
export async function getLatestBottless() {
  const data = await prisma.bottles.findMany({
    take: LATEST_BOTTLES_LIMIT,
    orderBy: { createdAt: 'desc' },
  });

  return convertToPlainObject(data);
}




// Get single bottle by it's ID
export async function getBottleById(bottleId: string) {
  const data = await prisma.bottles.findFirst({
    where: { id: bottleId },
  });

  return convertToPlainObject(data);
}



// Get all bottles
export async function getAllBottles({
  query,
  limit = PAGE_SIZE,
  page,
  category,
  price,
  // rating,
  sort,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
  price?: string;
  // rating?: string;
  sort?: string;
}) {
  // Query filter
  const queryFilter: Prisma.BottlesWhereInput =
    query && query !== 'all'
      ? {
          name: {
            contains: query,
            mode: 'insensitive',
          } as Prisma.StringFilter,
        }
      : {};

  // Category filter
  const categoryFilter = category && category !== 'all' ? { category } : {};

  // Price filter
  const priceFilter: Prisma.BottlesWhereInput =
    price && price !== 'all'
      ? {
          price: {
            gte: price.split('-')[0],
            lte: price.split('-')[1],
          },
        }
      : {};

  // Rating filter
  // const ratingFilter =
  //   rating && rating !== 'all'
  //     ? {
  //         rating: {
  //           gte: Number(rating),
  //         },
  //       }
  //     : {};

  const data = await prisma.bottles.findMany({
    where: {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      // ...ratingFilter,
    },
    orderBy:
      sort === 'lowest'
        ? { price: 'asc' }
        : sort === 'highest'
        ? { price: 'desc' }
        // : sort === 'rating'
        // ? { rating: 'desc' }
        : { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });

  const dataCount = await prisma.bottles.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}


// get total bottles
export async function getTotalBottles(){

  const data = await prisma.bottles.findMany();

  return {
    data
  };

}



// Delete a bottles
export async function deleteBottle(id: string) {
  try {
    const bottleExists = await prisma.bottles.findFirst({
      where: { id },
    });

    if (!bottleExists) throw new Error('Bottle not found');

    await prisma.bottles.delete({ where: { id } });

    revalidatePath('/admin/bottles');

    return {
      success: true,
      message: 'Bottle deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Create a bottle
export async function createBottle(data: z.infer<typeof insertBottleSchema>) {
  try {
    const bottle = insertBottleSchema.parse(data);
    await prisma.bottles.create({ data: bottle });

    revalidatePath('/admin/bottles');

    return {
      success: true,
      message: 'Bottle created successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update a bottle
export async function updateBottle(data: z.infer<typeof updateBottleSchema>) {
  try {
    const bottle = updateBottleSchema.parse(data);
    const bottleExists = await prisma.bottles.findFirst({
      where: { id: bottle.id },
    });

    if (!bottleExists) throw new Error('Bottle not found');

    await prisma.bottles.update({
      where: { id: bottle.id },
      data: bottle,
    });

    revalidatePath('/admin/bottle');

    return {
      success: true,
      message: 'Bottle updated successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Get all categories
export async function getAllCategories() {
  const data = await prisma.bottles.groupBy({
    by: ['category'],
    _count: true,
  });

  return data;
}

// Get featured bottle
export async function getFeaturedBottles() {
  const data = await prisma.bottles.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: 'desc' },
    take: 4,
  });

  return convertToPlainObject(data);
}
