"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

// Add Card Button Props Type
type Props = {
  onAddCard: () => void;
};

// Add Card Button Component
const AddCardButton = ({ onAddCard }: Props) => {
  const [showGap, setShowGap] = useState(false);

  // Render the Add Card Button
  return (
    <motion.div
      className="w-full relative overfllow-hidden"
      initial={{ height: "0.5rem" }}
      animate={{ height: showGap ? "2rem" : "0.5rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onHoverStart={() => setShowGap(true)}
      onHoverEnd={() => setShowGap(false)}
    >
      {/* Animate Presence */}
      <AnimatePresence>
        {/* If the show gap is true, render the gap */}
        {showGap && (
          // Motion.div for the gap
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Div for the gap */}
            <div className="w-[40%] h-[1px] bg-primary" />
            {/* Button for the add card */}
            <Button
              variant="outline"
              size="sm"
              className="rounded-full h-8 w-8 p-0 bg-primary hover:bg-primary"
              onClick={onAddCard}
              aria-label="Add new card"
            >
              <Plus className="h-4 w-4 text-white dark:text-black" />
            </Button>
            {/* Div for the gap */}
            <div className="w-[40%] h-[1px] bg-primary" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AddCardButton;
