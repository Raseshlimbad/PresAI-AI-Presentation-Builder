import { getRecentProjects } from '@/actions/project';
import { onAuthenticateUser } from '@/actions/user'
import AppSidebar from '@/components/global/app-sidebar';
import UpperInfoBar from '@/components/global/upper-info-bar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = { children: React.ReactNode}

// Layout Component
const Layout = async ({children}: Props) => {
  // Get the recent projects
    const recentprojects = await getRecentProjects();

    // Check if the user is authenticated
    const checkUser = await onAuthenticateUser();
    if(!checkUser.user) redirect('/sign-in');

    // Render the Layout
  return ( 
    // Layout Container
    <div className='w-full min-h-screen'>
      {/* Sidebar Provider */}
      <SidebarProvider>
        {/* App Sidebar */}
        <AppSidebar recentProjects={recentprojects.data || []}
        user={checkUser.user} />
        {/* Sidebar Inset */}
        <SidebarInset>
          {/* Upper Info Bar */}
          <UpperInfoBar user={checkUser.user} />
          {/* Main Content */}
          <div className='p-4'>
          {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export default Layout
