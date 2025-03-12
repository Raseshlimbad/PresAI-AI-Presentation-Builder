import { filterProjects, getAllProjects } from '@/actions/project';
import NotFound from '@/components/global/not-found/NotFound';
import Projects from '@/components/global/projects';
import React from 'react'

const DashboardPage = async ({searchParams}: {searchParams: {search?: string}}) => {
  // const allProjects = await getAllProjects();

  // Get the search term
  const searchTerm = searchParams.search;

  // Get the projects
  const projectsResponse = searchTerm
  ? await filterProjects(searchTerm)
  : await getAllProjects();

  // Get the projects
  const projects = projectsResponse.data || [];

  // Render the Dashboard Page
  return (
    // Dashboard Page Container
    <div className='w-full flex flex-col gap-6 relative p-4 md:p-0'>
      {/* Header */}
      <div className="flex flex-col-reverse items-start w-full gap-5 sm:flex-row sm:justify-between sm:items-center">
        {/* Header Title */}
        <div className="flex flex-col items-start pl-2">
          {/* Header Title */}
          <h1 className='text-2xl font-semibold backdrop-blur-lg dark:text-primary'>
            Projects
          </h1>
          {/* Header Description */}
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

      {/* Projects */}
      {projects.length > 0 ? (
        <Projects projects={projects} />
        // If the projects are not found, show a not found component
      ) : (
        <NotFound />
      )}
    </div>
  )
}

export default DashboardPage
