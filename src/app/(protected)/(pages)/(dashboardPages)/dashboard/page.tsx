import { filterProjects, getAllProjects } from '@/actions/project';
import NotFound from '@/components/global/not-found/NotFound';
import Projects from '@/components/global/projects';
import React from 'react'

const DashboardPage = async ({searchParams}: {searchParams: {search?: string}}) => {
  // const allProjects = await getAllProjects();

  const searchTerm = await searchParams.search;

  const projectsResponse = searchTerm
  ? await filterProjects(searchTerm)
  : await getAllProjects();

  const projects = projectsResponse.data || [];

  return (
    <div className='w-full flex flex-col gap-6 relative p-4 md:p-0'>
      <div className="flex flex-col-reverse items-start w-full gap-5 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col items-start pl-2">
          <h1 className='text-2xl font-semibold backdrop-blur-lg dark:text-primary'>
            Projects
          </h1>
          <p className="text-base font-normal dark:text-secondary">
            All of your work in one place
          </p>
        </div>
      </div>


      {/* {"Projects"} */}
      {/* {allProjects.data && allProjects.data.length > 0 ? (
        <Projects projects={allProjects.data}/>
      ) : (
      <NotFound />
      )} */}

      {/* {"Projects"} */}
      {projects.length > 0 ? (
        <Projects projects={projects} />
      ) : (
        <NotFound />
      )}
    </div>
  )
}

export default DashboardPage
