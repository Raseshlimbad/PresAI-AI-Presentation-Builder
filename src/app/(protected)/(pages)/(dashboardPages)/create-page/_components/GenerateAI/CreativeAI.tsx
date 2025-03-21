"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, RotateCcw } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import useCreativeAIStore from "@/store/useCreativeAiStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CardList from "../Common/CardList";
import usePromptStore from "@/store/usePromptStore";
import RecentPrompts from "./RecentPrompts";
import { toast } from "sonner";
import { generateCreativePrompt } from "@/actions/ai";
import { OutlineCard } from "@/lib/types";
import { createProject } from "@/actions/project";
import { useRouter } from "next/navigation";
import { useSlideStore } from "@/store/useSlideStore";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type Props = {
  onBack: () => void;
};

// Creative AI Component
const CreativeAI = ({ onBack }: Props) => {
  const {
    currentAiPrompt,
    setCurrentAiPrompt,
    outlines,
    resetOutlines,
    addOutline,
    addMultipleOutlines,
  } = useCreativeAIStore();
  const { setProject } = useSlideStore();
  const [noOfCards, setNoOfCards] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");
  const { prompts, addPrompt } = usePromptStore();
  const router = useRouter();

  // Handle Back
  const handleBack = () => {
    onBack();
  };

  // Handle Reset Cards
  const handleResetCards = () => {
    setEditingCard(null);
    setSelectedCard(null);
    setEditText("");

    setCurrentAiPrompt("");
    resetOutlines();
  };

  // Handle Generate Outline
  const generateOutline = async () => {
    // If the current AI prompt is empty, show an error toast
    if (currentAiPrompt === "") {
      toast.error("Error", {
        description: "Please enter a prompt to generate an outline",
      });
      return;
    }

    // Set the is generating state to true
    setIsGenerating(true);

    // Generate the creative prompt
    const res = await generateCreativePrompt(currentAiPrompt, noOfCards);

    // If the response is successful and the outlines are present, add the outlines to the store
    if (res.status === 200 && res?.data?.outlines) {
      const cardsData: OutlineCard[] = [];
      // Map through the outlines and add them to the store
      res.data?.outlines.map((outline: string, index: number) => {
        const newCard = {
          id: uuidv4(),
          title: outline,
          order: index + 1,
        };
        cardsData.push(newCard);
      });
      // Add the outlines to the store
      addMultipleOutlines(cardsData);
      // Set the is generating state to false
      setIsGenerating(false);
      // Show a success toast
      toast.success("Success", {
        description: "Outline generated successfully",
      });
    } else {
      // If the response is not successful, show an error toast
      toast.error("Error", {
        description: "Failed to generate outline, Please try again",
      });
      // Set the is generating state to false
      setIsGenerating(false);
    }
  };

  // Handle Generate
  const handleGenerate = async () => {
    // TODO: change cards functionality to handle generate number of outlines

    // Set the is generating state to true
    setIsGenerating(true);

    // If the outlines are empty, show an error toast
    if (outlines.length === 0) {
      toast.error("Error", {
        description: "Failed to generate outline. Please try again.",
      });
      return;
    }

    // Try to create the project
    try {
      // Create the project
      const res = await createProject(
        currentAiPrompt,
        outlines.slice(0, noOfCards)
      );
      // If the project is not created, show an error toast
      if (res.status !== 200 || !res.data) {
        throw new Error("Failed to create project");
      }

      // Redirect to the select theme page
      router.push(`/presentation/${res.data.id}/select-theme`);
      // Set the project
      setProject(res.data);
      // Add the prompt
      addPrompt({
        id: uuidv4(),
        title: currentAiPrompt || outlines?.[0]?.title,
        outlines: outlines,
        createdAt: new Date().toISOString(),
      });

      // Show a success toast
      toast.success("Success", {
        description: "Project created successfully",
      });

      // Reset the current AI prompt, reset the outlines, and set the is generating state to false
      setCurrentAiPrompt("");
      resetOutlines();
      setIsGenerating(false);
      setNoOfCards(0);
    } catch (error) {
      // If the error is not a string, show an error toast
      if (typeof error !== "string") {
        error = "Failed to create project";
      }
      // Show an error toast
      toast.error("Error", {
        description: "Failed to create project. Please try again.",
      });
    } finally {
      // Set the is generating state to false
      setIsGenerating(false);
    }
  };

  // Use Effect to set the number of cards
  useEffect(() => {
    setNoOfCards(outlines.length);
  }, [outlines.length]);

  // Render the Creative AI Component
  return (
    <DndProvider backend={HTML5Backend}>
      {/* Motion.div for the container */}
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
        {/* Title */}
        <motion.div variants={itemVariants} className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">
            Generate with <span className="text-presai">Creative AI</span>
          </h1>
          <p className="dark:text-secondary">
            What would you like to create today?
          </p>
        </motion.div>
        {/* Input Container */}
        <motion.div
          className="bg-primary/10 p-4 rounded-xl"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
            {/* Input */}
            <Input
              // Placeholder
              placeholder={
                currentAiPrompt || "Enter the Prompt and add to the cards..."
              }
              className="text-base sm:text-xl borer-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow"
              required
              onChange={(e) => setCurrentAiPrompt(e.target.value)}
            />
            {/* Select */}
            <div className="flex items-center gap-3">
              <Select
                value={noOfCards.toString()}
                onValueChange={(value) => setNoOfCards(parseInt(value))}
              >
                {/* Select Trigger */}
                <SelectTrigger>
                  <SelectValue placeholder="Select Number of Cards" />
                </SelectTrigger>
                {/* Select Content */}
                <SelectContent className="w-fit">
                  {/* Map through 15 possible cards and show them as select items */}
                  {Array.from({ length: 15 }, (_, i) => i + 6).map((num) => (
                    <SelectItem
                      key={num}
                      value={num.toString()}
                      className="font-semibold"
                    >
                      {num} {num === 1 ? "Card" : "Cards"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Reset Cards Button */}
              <Button
                variant={"destructive"}
                onClick={handleResetCards}
                size={"icon"}
                aria-label="Reset cards"
              >
                <RotateCcw className="h-4 w-4 mx-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Generate Outline Button */}
        <div className="w-full flex justify-center items-center">
          <Button
            className="font-medium text-lg gap-2 items-center"
            onClick={generateOutline}
            disabled={isGenerating}
          >
            {/* If the is generating state is true, show a loading icon */}
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin mr-2" /> Generating...
              </>
            ) : (
              // If the is generating state is false, show the generate outline text
              <>Generate Outline</>
            )}
          </Button>
        </div>

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

        {/* Generate Button */}
        {outlines.length > 0 && (
          <Button
            className="w-full"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {/* If the is generating state is true, show a loading icon */}
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin mr-2" /> Generating...
              </>
            ) : (
              // If the is generating state is false, show the generate text
              "Generate"
            )}
          </Button>
        )}

        {/* Recent Prompts */}
        {prompts?.length > 0 && <RecentPrompts />}
      </motion.div>
    </DndProvider>
  );
};

export default CreativeAI;
