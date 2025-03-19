"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/constants";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScratchStore from "@/store/useStartScratchStore";
import { v4 as uuidv4 } from "uuid";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import CardList from "../Common/CardList";
import { OutlineCard } from "@/lib/types";
import { toast } from "sonner";
import { createProject } from "@/actions/project";
import { useSlideStore } from "@/store/useSlideStore";
import { useRouter } from "next/navigation";

type Props = {
  onBack: () => void;
};

// Scratch Page Component
const ScratchPage = ({ onBack }: Props) => {
  const { outlines, resetOutlines, addMultipleOutlines, addOutline } =
    useScratchStore();
  const { setProject } = useSlideStore();
  const router = useRouter();
  const [editText, setEditText] = useState("");
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // Handle Back
  const handleBack = () => {
    resetOutlines();
    onBack();
  };

  // Handle Reset Cards
  const resetcards = () => {
    setEditText("");
    resetOutlines();
  };

  // Handle Add Card
  const handleAddCard = () => {
    const newCard: OutlineCard = {
      id: uuidv4(),
      title: editText || "New section",
      order: outlines.length + 1,
    };
    // Reset the edit text and add the new card
    setEditText("");
    addOutline(newCard);
  };

  // Handle Generate
  const handleGenerate = async () => {
    // If the outlines are empty, show an error toast
    if (outlines.length === 0) {
      toast.error("Error", {
        description: "Please add at least one card to generate slides",
      });
      return;
    }
    // Create the project
    const res = await createProject(outlines?.[0]?.title, outlines);
    // If the project is not created, show an error toast
    if (res.status !== 200) {
      toast.error("Error", {
        description: res.message || "Failed to create project",
      });
      return;
    }

    // If the project is created, set the project and reset the outlines
    if (res.data) {
      setProject(res.data);
      resetOutlines();
      // Show a success toast
      toast.success("Success", {
        description: "Project created successfully",
      });
      // Redirect to the select theme page
      router.push(`/presentation/${res.data?.id}/select-theme`);
    } else {
      // If the project is not created, show an error toast
      toast.error("Error", {
        description: "Failed to create project",
      });
    }
  };

  // Render the Scratch Page
  return (
    // Motion.div for the container
    <motion.div
      className="space-y-6 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Back Button */}
      <Button onClick={handleBack} variant="outline" className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      {/* Prompt */}
      <h1 className="text-2xl sm:text-3xl font-bold text-primary text-left">
        Prompt
      </h1>
      {/* Input Container */}
      <motion.div
        className="bg-primary/10 p-4 rounded-xl"
        variants={itemVariants}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
          {/* Input */}
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Enter your prompt and add to the cards..."
            className="text-base sm:text-xl borer-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow"
            required
          />

          {/* Display number of outline cards */}
          <div className="flex items-center gap-3 whitespace-nowrap">
            <span className="font-semibold">
              {outlines.length === 0
                ? "No cards"
                : `${outlines.length} ${
                    outlines.length === 1 ? "Card" : "Cards"
                  }`}
            </span>

            {/* Reset Cards Button */}
            <Button
              variant={"destructive"}
              size={"icon"}
              aria-label="Reset cards"
              onClick={resetcards}
            >
              {/* RotateCcw Icon */}
              <RotateCcw className="h-4 w-4 mx-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Card List */}
      <CardList
        outlines={outlines}
        editingCard={editingCard}
        selectedCard={selectedCard}
        editText={editText}
        onEditChange={setEditText}
        onCardSelect={setSelectedCard}
        setEditText={setEditText}
        setEditingCard={setEditingCard}
        setSelectedCard={setSelectedCard}
        addOutline={addOutline}
        addMultipleOutlines={addMultipleOutlines}
        onCardDoubleClick={(id, title) => {
          setEditingCard(id);
          setEditText(title);
        }}
      />

      {/* Add Cards Button */}
      <Button
        variant={"secondary"}
        className="w-full bg-primary-10"
        onClick={handleAddCard}
      >
        Add Cards
      </Button>

      {/* Generate Slides Button */}
      {outlines?.length > 0 && (
        <Button className="w-full" onClick={handleGenerate}>
          Create Slides
        </Button>
      )}
    </motion.div>
  );
};

export default ScratchPage;
