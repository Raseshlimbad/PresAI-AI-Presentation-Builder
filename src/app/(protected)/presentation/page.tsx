import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
    redirect('/dashboard')
  return (
    <div>
      Presentation Page
    </div>
  )
}

export default page
