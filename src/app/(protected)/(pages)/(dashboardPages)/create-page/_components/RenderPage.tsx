"use client";

import usePromptStore from "@/store/usePromptStore";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";
import CreatePage from "./CreatePage/CreatePage";
import CreativeAI from "./GenerateAI/CreativeAI";
import ScratchPage from "./Scratch/ScratchPage";

const RenderPage = () => {
  const router = useRouter();
  const { page, setPage } = usePromptStore();

  // Handle Back
  const handleBack = () =>{
    setPage('create')
  }

  // Handle Select Option
  const handleSelectOption = (option:string) => {
    if(option === 'template'){
      router.push('/templates')
    }else if(option === 'create-scratch'){
      setPage('create-scratch')
    }else{
      setPage('creative-ai')
    }
  }

  // Render the step
  const renderStep = () => {
    switch(page){
      // 'create' case is default
      case 'create':
        return <CreatePage onSelectOption={handleSelectOption}/>
      case 'creative-ai':
        return <CreativeAI onBack={handleBack}/>
      case 'create-scratch':
        return <ScratchPage onBack={handleBack}/>
    }
  }

  return (
    // AnimatePresence for the page transitions
    <AnimatePresence mode="wait">
      <motion.div
        key={page}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 1 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Render the step */}
        {renderStep()}
      </motion.div>
    </AnimatePresence>
  );
};

export default RenderPage;
