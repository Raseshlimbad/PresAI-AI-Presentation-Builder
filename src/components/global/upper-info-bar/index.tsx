import { SidebarTrigger } from '@/components/ui/sidebar'
import { User } from '@prisma/client'
import { Separator } from '@radix-ui/react-separator'
import React from 'react'
import SearchBar from './uspper-info-searchbar'
import ThemeSwitcher from '../mode-toggle'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import NewProjectButton from './new-project-button'

type Props = {
    user: User
}

const UpperInfoBar = ({user} : Props) => {
  return (
    // Upper Info Bar
    <header className='sticky top-0 z-[10] flex shrink-0 flex-wrap items-center gap-2 bg-background p-4 justify-between'>
      {/* Sidebar Trigger */}
      <SidebarTrigger className='ml-1' />
      {/* Separator */}
      <Separator
      orientation='vertical'
      className='mr-2 h-4' />

      {/* Search Bar */}
      <div className='w-fill max-w-[95%] flex items-center justify-center gap-4 flex-wrap'>
        <SearchBar />
      </div>

      {/* Theme Switcher */}
      <ThemeSwitcher />

      {/* Button Container */}
      <div className="flex flex-wrap gap-4 items-center justify-end">
        {/* Import Button */}
        {/* <Button className="bg-primary-80 rounded-lg hover:bg-[background-80] text-primary dark:bg-[#262626] font-semibold">
          <Upload />
          Import
        </Button> */}
        {/* New Project Button */}
        <NewProjectButton user= {user}/>
      </div>
    </header>
  )
}

export default UpperInfoBar
