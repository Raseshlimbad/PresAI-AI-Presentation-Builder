import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { containerVariants, itemVariants } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";
import useCreativeAIStore from "@/store/useCreativeAiStore";
import usePromptStore from "@/store/usePromptStore";
import { motion } from "framer-motion";
import React from "react";
import { toast } from "sonner";

const RecentPrompts = () => {
  const { prompts, setPage } = usePromptStore();
  const { addMultipleOutlines, setCurrentAiPrompt } = useCreativeAIStore();

  // Handle Edit
  const handleEdit = (id: string) => {
    const prompt = prompts.find((prompt) => prompt.id === id);
    // If the prompt is found, set the page to creative ai, add the outlines to the store, and set the current ai prompt
    if (prompt) {
      setPage("creative-ai");
      addMultipleOutlines(prompt?.outlines);
      setCurrentAiPrompt(prompt?.title);
    } else {
      // If the prompt is not found, show an error toast
      toast.error("Error", {
        description: "Prompt not found!",
      });
    }
  };
  // Render the Recent Prompts
  return (
    // Motion.div for the container
    <motion.div variants={containerVariants} className="space-y-4 !mt-20">
      {/* Motion.h2 for the title */}
      <motion.h2
        variants={itemVariants}
        className="text-2xl font-semibold text-center"
      >
        Your Recent Prompts
      </motion.h2>
      {/* Motion.div for the container */}
      <motion.div
        variants={containerVariants}
        className="space-y-2 w-full lg:max-w-[80%] mx-auto"
      >
        {/* Map through the prompts and render a card */}
        {prompts.map((prompt, i) => (
          <motion.div key={i} variants={itemVariants}>
            {/* Card */}
            <Card className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors duration-300">
              {/* Div for the title and created at */}
              <div className="max-w-[70%]">
                {/* Motion.h3 for the title */}
                <motion.h3
                  variants={itemVariants}
                  className="font-semibold text-xl line-clamp-1"
                >
                  {prompt?.title}
                </motion.h3>
                {/* Motion.p for the created at */}
                <motion.p
                  variants={itemVariants}
                  className="font-semibold text-sm text-muted-foreground"
                >
                  {timeAgo(prompt?.createdAt)}
                </motion.p>
              </div>
              <div className="flex items-center gap-4">
                {/* Motion.span for the creative ai */}
                  <motion.span
                  variants={itemVariants}
                  className="text-sm text-vivid"
                >
                  Creative AI
                </motion.span>
                {/* Button for the edit */}
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-xl bg-primary-20 dark:hover:bg-gray-700 hover:bg-gray-200 text-primary"
                  onClick={() => handleEdit(prompt?.id)}
                >
                  Edit
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RecentPrompts;
