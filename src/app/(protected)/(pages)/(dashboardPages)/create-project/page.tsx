import React, { Suspense } from 'react'
import CreatePageSkeleton from './_components/CreatePage/CreatePageSkeleton'
import RenderPage from './_components/RenderPage'

const Page = () => {
  return (
   <main>
    <Suspense fallback={<CreatePageSkeleton />}>
    <RenderPage />
    </Suspense>
   </main>
  )
}

export default Page
