"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/constants";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScratchStore from "@/store/useStartScratchStore";
import { v4 as uuidv4} from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const ScratchPage = ({ onBack }: Props) => {
  const { outlines, resetOutlines, addMultipleOutlines, addOutline } =
    useScratchStore();
  const { setProject } = useSlideStore();
  const router = useRouter();
  const [editText, setEditText] = useState("");
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleBack = () => {
    resetOutlines();
    onBack();
  };

  const resetcards = () => {
    setEditText("");
    resetOutlines();
  };

  const handleAddCard = () => {
    const newCard: OutlineCard = {
      id: uuidv4(),
      title: editText || "New section",
      order: outlines.length + 1,
    };
    setEditText("");
    addOutline(newCard);
  };

  const handleGenerate = async () => {
    if (outlines.length === 0) {
      toast.error("Error", {
        description: "Please add at least one card to generate slides",
      });
      return;
    }
    const res = await createProject(outlines?.[0]?.title, outlines);
    if (res.status !== 200) {
      toast.error("Error", {
        description: res.message || "Failed to create project",
      });
      return;
    }

    if (res.data) {
      setProject(res.data);
      resetOutlines();
      toast.success("Success", {
        description: "Project created successfully",
      });
      router.push(`/presentation/${res.data?.id}/select-theme`);
    }else{
        toast.error("Error", {
            description: "Failed to create project",
        })
    }
  };

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
      <h1 className="text-2xl sm:text-3xl font-bold text-primary text-left">
        Prompt
      </h1>
      <motion.div
        className="bg-primary/10 p-4 rounded-xl"
        variants={itemVariants}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Enter your prompt and add to the cards..."
            className="text-base sm:text-xl borer-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow"
            required
          />

          <div className="flex items-center gap-3">
            <Select
              value={outlines.length > 0 ? outlines.length.toString() : "0"}
            >
              <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
                <SelectValue placeholder="Select number of cards" />
              </SelectTrigger>
              <SelectContent className="w-fit">
                {outlines.length === 0 ? (
                  <SelectItem value="0" className="font-semibold">
                    No cards
                  </SelectItem>
                ) : (
                  Array.from(
                    { length: outlines.length },
                    (_, idx) => idx + 1
                  ).map((num) => (
                    <SelectItem
                      value={num.toString()}
                      className="font-semibold"
                      key={num}
                    >
                      {num} {num === 1 ? "Card" : "Cards"}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          <Button
            variant={"destructive"}
            size={"icon"}
            aria-label="Reset cards"
            onClick={resetcards}
          >
            <RotateCcw className="h-4 w-4 mx-4" />
          </Button>
          </div>

        </div>
      </motion.div>

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

      <Button
        variant={"secondary"}
        className="w-full bg-primary-10"
        onClick={handleAddCard}
      >
        Add Cards
      </Button>

      {outlines?.length > 0 && (
        <Button className="w-full" onClick={handleGenerate}>
          Generate Slides
        </Button>
      )}
    </motion.div>
  );
};

export default ScratchPage;
