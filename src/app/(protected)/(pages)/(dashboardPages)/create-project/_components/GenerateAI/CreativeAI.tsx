"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
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

type Props = {
  onBack: () => void;
};

const CreativeAI = ({ onBack }: Props) => {
  const { currentAiPrompt, setCurrentAiPrompt, outlines , resetOutlines} =
    useCreativeAIStore();
  const [noOfCards, setNoOfCards] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  const handleBack = () => {
    onBack();
  };

  const handleResetCards = () => {
    setEditingCard(null);
    setSelectedCard(null);
    setEditText("");

    setCurrentAiPrompt("");
    resetOutlines();
  };

  const handleGenerateOutline = () => {

  }
  return (
    <motion.div
      className="space-y-6 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Button onClick={handleBack} variant="outline" className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">
          Generate with <span className="text-vivid">Creative AI</span>
        </h1>
        <p className="text-secondary">What would you like to create today?</p>
      </motion.div>

      <motion.div
        className="bg-primary/10 p-4 rounded-xl"
        variants={itemVariants}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
          <Input
            placeholder={
              currentAiPrompt || "Enter the Prompt and add to the cards..."
            }
            className="text-base sm:text-xl borer-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow"
            required
            onChange={(e) => setCurrentAiPrompt(e.target.value)}
          />
          <div className="flex items-center gap-3">
            <Select
              value={noOfCards.toString()}
              onValueChange={(value) => setNoOfCards(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Number of Cards" />
              </SelectTrigger>
              <SelectContent className="w-fit">
                {outlines.length === 0 ? (
                  <SelectItem value={"0"} className="font-semibold">
                    No cards
                  </SelectItem>
                ) : (
                  Array.from({ length: outlines.length }, (_, i) => i + 1).map(
                    (num) => (
                      <SelectItem
                        key={num}
                        value={num.toString()}
                        className="font-semibold"
                      >
                        {num} {num === 1 ? "Card" : "Cards"}
                      </SelectItem>
                    )
                  )
                )}
              </SelectContent>
            </Select>
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
      <div className="w-full flex justify-center items-center">
        <Button className="font-medium text-lg gap-2 items-center"
        onClick={handleGenerateOutline}
        disabled={isGenerating}>
            {isGenerating ? (
                <>
                <Loader2 className="animate-spin mr-2"/> Generating...
                </>
            ) : (
                <>
                    Generate Outline
                </>
            )}
                
        </Button>
      </div>

      <CardList />
    </motion.div>
  );
};

export default CreativeAI;
