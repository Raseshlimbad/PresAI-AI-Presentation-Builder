import { Loader2 } from 'lucide-react'
import React from 'react'

const AuthLoading = () => {
  return (
    // Div for the container
    <div className='h-screen w-full flex justify-center items-center'>
      {/* Loader2 Icon */}
      <Loader2 className='animate-spin'/>
    </div>
  )
}

export default AuthLoading
