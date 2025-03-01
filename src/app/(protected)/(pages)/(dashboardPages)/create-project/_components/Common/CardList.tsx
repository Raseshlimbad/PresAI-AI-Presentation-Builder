'ue client'

import { OutlineCard } from "@/lib/types";
import { motion } from "framer-motion";
import React, { useState } from "react";

type Props = {
  outlines: OutlineCard[];
  editingCard: string | null;
  selectedCard: string | null;
  editText: string;
  addOutline?: (card: OutlineCard) => void;
  onEditChange: (value: string) => void;
  onCardSelect: (id: string) => void;
  onCardDoubleClick: (id: string, title: string) => void;
  setEditText: (value: string) => void;
  setEditingCard: (id: string | null) => void;
  setSelectedCard: (id: string | null) => void;
  addMultipleOutlines?: (cards: OutlineCard[]) => void;
};

const CardList = ({
  editText,
  editingCard,
  onCardDoubleClick,
  onCardSelect,
  onEditChange,
  outlines,
  selectedCard,
  setEditText,
  setEditingCard,
  setSelectedCard,
  addMultipleOutlines,
  addOutline,
}: Props) => {

    const [draggedItem, setDraggedItem] = useState<OutlineCard | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const onDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if(!draggedItem) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const threshold = rect.height / 2;

        if(y < threshold){
            setDragOverIndex(index);
        } else {
            setDragOverIndex(index + 1);
        }

    }

  return (
    <motion.div
    className="space-y-2 -my-2"
    layout
    onDragOver={(e) => {
        e.preventDefault();
        if(outlines.length === 0 || e.currentTarget.getBoundingClientRect().bottom - 20){
            onDragOver(e, outlines.length);
        }
    }}
    >

    </motion.div>
  );
};

export default CardList;
