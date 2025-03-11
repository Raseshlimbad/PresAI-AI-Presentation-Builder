import React from 'react'

type Props = {
    children: React.ReactNode
}

// Auth Layout
const Layout = ({children} : Props) => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      {children}
    </div>
  )
}

export default Layout
