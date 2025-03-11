// import { onAuthenticateUser } from '@/actions/user';
import React from 'react'


const Page = async () => {

    // WIP

    // Get the current user
    // const currentUser = await onAuthenticateUser();

    // Render the Page
  return (
    // Page Container
    <div className="flex flex-col gap-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center">
        {/* Header Title */}
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
            Settings
        </h1>
        <p className="text-base font-normal dark:text-secondary">
          All your settings
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page