import { getRecentProjects } from '@/actions/project';
import { onAuthenticateUser } from '@/actions/user'
import AppSidebar from '@/components/global/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = { children: React.ReactNode}

const Layout = async ({children}: Props) => {
    const recentprojects = await getRecentProjects();

    const checkUser = await onAuthenticateUser();
    if(!checkUser.user) redirect('/sign-in');
  return (
    <div className='w-full min-h-screen'>
      <SidebarProvider>
        <AppSidebar recentProjects={recentprojects.data || []}
        user={checkUser.user}>
          {/* {children} */}
        </AppSidebar>
      </SidebarProvider>
    </div>
  )
}

export default Layout
