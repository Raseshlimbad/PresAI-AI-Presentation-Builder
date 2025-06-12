"use client";

import { OutlineCard } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import Card from "./Card";
import AddCardButton from "./AddCardButton";

// Card List Props Type
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

// Card List Component
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
}: Props) => {
  const [draggedItem, setDraggedItem] = useState<OutlineCard | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragOffsetY = useRef<number>(0);

  // On Drag Over
  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (!draggedItem) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const threshold = rect.height / 2;
    // Set dragOverIndex to index (above) or index + 1 (below)
    setDragOverIndex(y < threshold ? index : index + 1);
  };

  // On Drop
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem || dragOverIndex === null) return;
    const updatedCards = [...outlines];
    const draggedIndex = updatedCards.findIndex(
      (card) => card.id === draggedItem.id
    );
    if (draggedIndex === -1) return;

    // Remove the dragged card
    const [removedCard] = updatedCards.splice(draggedIndex, 1);
    // Insert it at dragOverIndex
    updatedCards.splice(dragOverIndex, 0, removedCard);

    // Update order for all cards
    const reorderedCards = updatedCards.map((card, index) => ({
      ...card,
      order: index + 1,
    }));

    // Update the store
    addMultipleOutlines?.(reorderedCards);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  // On Card Update
  const onCardUpdate = (id: string, newTitle: string) => {
    addMultipleOutlines?.(
      outlines.map((card) =>
        card.id === id ? { ...card, title: newTitle } : card
      )
    );
    setEditingCard(null);
    setEditText("");
    setSelectedCard(null);
  };

  // On Card Delete
  const onCardDelete = (id: string) => {
    addMultipleOutlines?.(
      outlines
        .filter((card) => card.id !== id)
        .map((card, index) => ({ ...card, order: index + 1 }))
    );
  };

  // On Drag Start
  const onDragStart = (e: React.DragEvent, card: OutlineCard) => {
    setDraggedItem(card);
    e.dataTransfer.effectAllowed = "move";
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dragOffsetY.current = e.clientY - rect.top;
    const draggedEl = e.currentTarget.cloneNode(true) as HTMLElement;
    draggedEl.style.position = "absolute";
    draggedEl.style.top = "-1000px";
    draggedEl.style.opacity = "0.8";
    draggedEl.style.width = `${(e.currentTarget as HTMLElement).offsetWidth}px`;
    draggedEl.style.zIndex = "1000";
    document.body.appendChild(draggedEl);
    e.dataTransfer.setDragImage(draggedEl, 0, dragOffsetY.current);
    // Remove setTimeout to avoid resetting dragOverIndex prematurely
    document.body.removeChild(draggedEl);
  };

  // On Drag End
  const onDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

    // Get Drag Over Styles
    const getDragOverStyles = (cardIndex: number) => {
      if (dragOverIndex === null || draggedItem === null) return {};
      const isDarkMode = document.documentElement.classList.contains("dark");
      const borderColor = isDarkMode ? "white" : "black";
      if (cardIndex === dragOverIndex) {
        return {
          borderTop: `2px solid ${borderColor}`,
          marginTop: "0.5rem",
          transition: "margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
        };
      } else if (cardIndex === dragOverIndex - 1) {
        return {
          borderBottom: `2px solid ${borderColor}`,
          marginBottom: "0.5rem",
          transition: "margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
        };
      }
      return {};
    };

  // On Add Card
  const onAddCard = (index?: number) => {
    const newCard: OutlineCard = {
      id: Math.random().toString(36).substring(2, 9),
      title: editText || "New Card",
      order: (index !== undefined ? index + 1 : outlines.length) + 1,
    };

    const updatedCards =
      index !== undefined
        ? [
            ...outlines.slice(0, index + 1),
            newCard,
            ...outlines
              .slice(index + 1)
              .map((card) => ({ ...card, order: card.order + 1 })),
          ]
        : [...outlines, newCard];

    addMultipleOutlines?.(updatedCards);
    setEditText("");
  };

  // Render the Card List
  return (
    <motion.div
      className="space-y-2 -my-2"
      layout
      onDragOver={(e) => {
        e.preventDefault();
        // Set dragOverIndex to the end if dragging over the container
        if (outlines.length > 0) {
          const lastCardRect = document
            .getElementById(`card-${outlines[outlines.length - 1].id}`)
            ?.getBoundingClientRect();
          if (lastCardRect && e.clientY > lastCardRect.bottom) {
            setDragOverIndex(outlines.length);
          }
        } else {
          setDragOverIndex(0);
        }
      }}
      onDrop={onDrop}
    >
      <AnimatePresence>
        {outlines.map((card, index) => (
          <React.Fragment key={card.id}>
            <Card
              card={card}
              isEditing={editingCard === card.id}
              isSelected={selectedCard === card.id}
              editText={editText}
              onEditChange={onEditChange}
              onEditBlur={() => onCardUpdate(card.id, editText)}
              onEditKeyDown={(e) => {
                if (e.key === "Enter") {
                  onCardUpdate(card.id, editText);
                }
              }}
              onCardClick={() => onCardSelect(card.id)}
              onCardDoubleClick={() => onCardDoubleClick(card.id, card.title)}
              onDeleteClick={() => onCardDelete(card.id)}
              dragHandlers={{
                onDragStart: (e) => onDragStart(e, card),
                onDragEnd: onDragEnd,
              }}
              dragOverStyles={getDragOverStyles(index)}
              onDragOver={(e) => onDragOver(e, index)}
            />
            <AddCardButton onAddCard={() => onAddCard(index)} />
          </React.Fragment>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default CardList;