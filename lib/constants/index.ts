export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Frag';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'A modern ecommerce store built with Next.js';
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

  export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

  export const LATEST_BOTTLES_LIMIT =
  Number(process.env.LATEST_BOTTLES_LIMIT) || 4;

export const signInDefaultValues = {
  email: 'admin@example.com',
  password: '123456',
};

export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const shippingAddressDefaultValues = {
  fullName: '',
  streetAddress: '',
  city: '',
  postalCode: '',
  country: '',
};

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(', ')
  : ['PayPal', 'ShareQRCode'];
export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || 'ShareQRCode';
  // process.env.DEFAULT_PAYMENT_METHOD || 'PayPal';

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12;

export const productDefaultValues = {
  name: '',
  slug: '',
  category: '',
  images: [],
  brand: '',
  description: '',
  price: '0',
  stock: 0,
  rating: '0',
  numReviews: '0',
  isFeatured: false,
  banner: null,
};

export const bottleDefaultValues = {
  name: '',
  category: '',
  images: [],
  brand: '',
  description: '',
  stock: 0,
  price: '',
  volume: '',
  isFeatured: false,
  banner: null,
};


// export const USER_ROLES = process.env.USER_ROLES
//   ? process.env.USER_ROLES.split(', ')
//   : ['admin', 'user'];

export const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:3000';

export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(', ')
  : ['admin', 'user', 'affiliate'];


export const SETUP_TYPES = process.env.SETUP_TYPES
  ? process.env.SETUP_TYPES.split(', ')
  : ['salon', 'pharmacy', 'retail'];



export const reviewFormDefaultValues = {
  title: '',
  comment: '',
  rating: 0,
};

export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'onboarding@resend.dev';
