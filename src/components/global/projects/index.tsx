import { Project } from "@prisma/client";
import React from "react";
import { motion } from "framer-motion";
import { containerVarients } from "@/lib/constants";
import ProjectCard from "../project-card";

interface Props {
  projects: Project[];
}

const Projects = ({ projects }: Props) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-4 gap-4"
      variants={containerVarients}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project, id) => (
        <ProjectCard
          key={id}
          projectId={project?.id}
          title={project?.title}
          createdAt={project?.createdAt.toString()}
          isDelete={project?.isDeleted}
          slideData={project?.slides}
          src={
            project.thumbnail ||
            "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYdlFHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      ))}
    </motion.div>
  );
};

export default Projects;
