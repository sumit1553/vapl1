import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export async function requireAffiliate() {
  const session = await auth()

  if (session?.user?.role !== 'affiliate') {
    redirect('/unauthorized')
  }

  return session
}
