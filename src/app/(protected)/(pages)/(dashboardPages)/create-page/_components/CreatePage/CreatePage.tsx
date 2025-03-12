'use client'

import { Button } from "@/components/ui/button";
import {
  containerVariants,
  CreatePageCard,
  itemVariants,
} from "@/lib/constants";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import RecentPrompts from "../GenerateAI/RecentPrompts";
import usePromptStore from "@/store/usePromptStore";

type Props = {
  onSelectOption: (option: string) => void;
};

// Create Page Component
const CreatePage = ({ onSelectOption }: Props) => {
    const {prompts, setPage} = usePromptStore();

    // Use Effect to set the page to create
    useEffect(() =>{
        setPage('create')
    },[setPage])

    // Render the Create Page Component
  return (
    
    // Motion.div for the container
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Motion.div for the title */}
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h1 className="text-4xl font-bold dark:text-primary">
          How would you like to get started?
        </h1>
        <p className="dark:text-secondary">
          Choose your preferred option to get started
        </p>
      </motion.div>
      {/* Motion.div for the container */}
      <motion.div
        variants={containerVariants}
        className="grid gap-6 md:grid-cols-3"
      >
        {/* Map through the create page cards and render a card */}
        {CreatePageCard.map((option) => (
          <motion.div
            key={option.type}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              rotate: 1,
              transition: { duration: 0.1 },
            }}
            className={`${
              option.highlight ? "bg-orange-400" : "hover:bg-orange-400 border"
            } rounded-xl p-[1px] transition-all duration-300 ease-in-out`}
          >
            {/* Content */}
            <motion.div
              className="w-full p-4 flex flex-col gap-y-6 items-start bg-white dark:bg-black rounded-xl"
              whileHover={{
                transition: { duration: 0.1 },
              }}
            >

              {/* Div for the title and highlighted text */}
              <div className="flex flex-col items-start w-full gap-y-3">
                <div>
                  <p className="text-primary text-lg font-semibold">
                    {option.title}
                  </p>
                  <p
                    className={`${
                      option.highlight ? "text-vivid" : "text-primary"
                    } text-4xl font-bold`}
                  >
                    {option.highlightedText}
                  </p>
                </div>
                {/* Motion.p for the description */}
                <p className="dark:text-secondary text-sm font-normal">
                  {option.description}
                </p>
              </div>
              {/* Motion.div for the button */}
              <motion.div
                className="self-end"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button */}
                <Button
                  variant={option.highlight ? "default" : "outline"}
                  className="w-fit rounded-xl font-bold"
                  size="sm"
                  onClick={() => onSelectOption(option.type)}
                >
                  {/* If the option is highlighted, show the generate text, otherwise show the continue text */}
                  {option.highlight ? "Generate" : "Continue"}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Motion.div for the recent prompts */}
      {prompts.length > 0 && <RecentPrompts />}
    </motion.div>
  );
};

export default CreatePage;
