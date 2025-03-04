import React, { Suspense } from 'react'
import CreatePageSkeleton from './_components/CreatePage/CreatePageSkeleton'
import RenderPage from './_components/RenderPage'
import { onAuthenticateUser } from '@/actions/user';
import { redirect } from 'next/navigation';

const Page = async () => {

  const checkUser = await onAuthenticateUser();

  // If user is not authenticated, redirect to sign-in page
  if(!checkUser.user) redirect('/sign-in');

  // If user doesn't have a subscription, redirect to dashboard page
  if(!checkUser.user?.subscription) redirect('/dashboard');

  return (
   <main>
    <Suspense fallback={<CreatePageSkeleton />}>
    <RenderPage />
    </Suspense>
   </main>
  )
}

export default Page
