"use server";

import { revalidatePath } from "next/cache";

// This could be replaced with DB logic
let selectedImage: string | null = null;
let selectedPrice: string | null = null;
let selectedVolume: string | null = null;

// export async function selectImage(imageUrl: string, price:s) {
export async function selectImage(imageUrl: string, price:string, volume:string) {
  selectedImage = imageUrl;
  selectedPrice = price;
  selectedVolume = volume;

  console.log("Image selected:", imageUrl);
  
  // Revalidate any page if needed
  revalidatePath("/");

  return { success: true, selected: imageUrl, selectedprice: price, selectedvolume: volume };
}

// Helper to get selection
export async function getSelectedImage() {
  // return selectedImage;
  return {selectedImage,selectedPrice,selectedVolume};
}
