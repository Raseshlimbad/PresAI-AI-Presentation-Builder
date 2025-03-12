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
  addOutline,
}: Props) => {
  const [draggedItem, setDraggedItem] = useState<OutlineCard | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragOffsetY = useRef<number>(0);

  // On Drag Over
  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    // If the dragged item is not set, return
    if (!draggedItem) return;
    // Get the bounding client rect
    const rect = e.currentTarget.getBoundingClientRect();
    // Get the y position
    const y = e.clientY - rect.top;
    // Get the threshold
    const threshold = rect.height / 2;
    // If the y position is less than the threshold, set the drag over index to the index
    if (y < threshold) {
      setDragOverIndex(index);
    } else {
      // Otherwise, set the drag over index to the index + 1
      setDragOverIndex(index + 1);
    }
  };

  // On Drop
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    // If the dragged item is not set, return
    if (!draggedItem || !dragOverIndex) return;
    // Get the updated cards
    const updatedCards = [...outlines];
    // Get the dragged index
    const draggedIndex = updatedCards.findIndex(
      (card) => card.id === draggedItem.id
    );
    // If the dragged index is -1 or the dragged index is the same as the drag over index, return
    if (draggedIndex === -1 || draggedIndex === dragOverIndex) return;
    // Get the removed card from the updated cards
    const [removedCard] = updatedCards.splice(draggedIndex, 1);
    // Add the removed card to the updated cards
    updatedCards.splice(
      dragOverIndex > draggedIndex ? dragOverIndex - 1 : dragOverIndex,
      0,
      removedCard
    );
    // Add the updated cards to the add multiple outlines
    addMultipleOutlines?.(
      updatedCards.map((card, index) => ({ ...card, order: index + 1 }))
    );
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  // On Card Update
  const onCardUpdate = (id: string, newTitle: string) => {
    // Add the updated cards to the add multiple outlines
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
    // Add the updated cards to the add multiple outlines
    addMultipleOutlines?.(
      outlines
        .filter((card) => card.id !== id)
        .map((card, index) => ({ ...card, order: index + 1 }))
    );
  };

  // On Drag Start
  const onDragStart = (e: React.DragEvent, card: OutlineCard) => {
    // Set the dragged item
    setDraggedItem(card);
    // Set the effect allowed
    e.dataTransfer.effectAllowed = "move";
    // Get the bounding client rect of the dragged element
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    // Set the drag offset y
    dragOffsetY.current = e.clientY - rect.top;
    // Clone the dragged element
    const draggedEl = e.currentTarget.cloneNode(true) as HTMLElement;
    // Set the position of the cloned element to absolute
    draggedEl.style.position = "absolute";
    draggedEl.style.top = "-1000px";
    draggedEl.style.opacity = "0.8";
    draggedEl.style.width = `${(e.currentTarget as HTMLElement).offsetWidth}px`;
    // Set the z index of the cloned element to 1000
    draggedEl.style.zIndex = "1000";
    // Append the cloned element to the body
    document.body.appendChild(draggedEl);
    // Set the drag image to the cloned element
    e.dataTransfer.setDragImage(draggedEl, 0, dragOffsetY.current);
    // Set the drag over index to the index of the card
    setTimeout(() => {
      setDragOverIndex(outlines.findIndex((c) => c.id === card.id));
      // Remove the cloned element from the body
      document.body.removeChild(draggedEl);
    }, 0);
  };

  // On Drag End
  const onDragEnd = () => {
    // Set the dragged item to null
    setDraggedItem(null);
    // Set the drag over index to null
    setDragOverIndex(null);
  };

  // Get Drag Over Styles
  const getDragOverStyles = (cardIndex: number) => {
    // If the drag over index is null or the dragged item is null, return an empty object
    if (dragOverIndex === null || draggedItem === null) return {};
    // If the card index is the same as the drag over index, return the styles
    if (cardIndex === dragOverIndex) {
      return {
        borderTop: "2px solid #000",
        marginTop: "0.5rem",
        transition: "margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
      };
    } else if (cardIndex === dragOverIndex - 1) {
      // If the card index is the same as the drag over index - 1, return the styles
      return {
        borderBottom: "2px solid #000",
        marginBottom: "0.5rem",
        transition: "margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
      };
    }
    // Otherwise, return an empty object
    return {};
  };

  // On Add Card
  const onAddCard = (index?: number) => {
    const newCard: OutlineCard = {
      id: Math.random().toString(36).substring(2, 9),
      title: editText || "New Card",
      order: (index !== undefined ? index + 1 : outlines.length) + 1,
    };

    // If the index is not undefined, update the cards
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

    // Add the updated cards to the add multiple outlines
    addMultipleOutlines?.(updatedCards);
    // Set the edit text to an empty string
    setEditText("");
  };

  // Render the Card List
  return (
    // Motion.div for the container
    <motion.div
      className="space-y-2 -my-2"
      layout
      onDragOver={(e) => {
        e.preventDefault();
        // If the outlines are empty or the bottom of the current target is less than 20, call the onDragOver function
        if (
          outlines.length === 0 ||
          e.currentTarget.getBoundingClientRect().bottom - 20
        ) {
          // Call the onDragOver function
          onDragOver(e, outlines.length);
        }
      }}
      // On Drop
      onDrop={(e) => {
        e.preventDefault();
        // Call the onDrop function
        onDrop(e);
      }}
    >
      {/* Animate Presence */}
      <AnimatePresence>
        {/* Map through the outlines and render a card */}
        {outlines.map((card, index) => (
          <React.Fragment key={card.id}>
            {/* Card */}
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

            {/* Add Card Button */}
            <AddCardButton onAddCard={() => onAddCard(index)} />
          </React.Fragment>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default CardList;






// ---------------------------------------------------------------------------------------------------------------------------


// "use client";

// import { OutlineCard } from "@/lib/types";
// import { AnimatePresence, motion } from "framer-motion";
// import React from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { v4 as uuidv4 } from "uuid";
// import Card from "./Card";
// import AddCardButton from "./AddCardButton";

// type Props = {
//   outlines: OutlineCard[];
//   editingCard: string | null;
//   selectedCard: string | null;
//   editText: string;
//   addOutline?: (card: OutlineCard) => void;
//   onEditChange: (value: string) => void;
//   onCardSelect: (id: string) => void;
//   onCardDoubleClick: (id: string, title: string) => void;
//   setEditText: (value: string) => void;
//   setEditingCard: (id: string | null) => void;
//   setSelectedCard: (id: string | null) => void;
//   addMultipleOutlines?: (cards: OutlineCard[]) => void;
// };

// const CardList = ({
//   editText,
//   editingCard,
//   onCardDoubleClick,
//   onCardSelect,
//   onEditChange,
//   outlines,
//   selectedCard,
//   setEditText,
//   setEditingCard,
//   setSelectedCard,
//   addMultipleOutlines,
//   addOutline,
// }: Props) => {
//   const moveCard = (dragIndex: number, hoverIndex: number) => {
//     const updatedCards = [...outlines];
//     const [movedCard] = updatedCards.splice(dragIndex, 1);
//     updatedCards.splice(hoverIndex, 0, movedCard);

//     // Update the order after reordering
//     addMultipleOutlines?.(
//       updatedCards.map((card, index) => ({ ...card, order: index + 1 }))
//     );
//   };

//   const handleAddCard = () => {
//     const newCard: OutlineCard = {
//       id: uuidv4(), // ✅ Always generate a new unique ID
//       title: `New Slide`,
//       order: outlines.length + 1,
//     };
//     addOutline?.(newCard);
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <motion.div className="space-y-2 -my-2">
//         <AnimatePresence>
//           {outlines.map((card, index) => (
//             <React.Fragment key={card.id}>
//               <Card
//                 index={index}
//                 card={card}
//                 isEditing={editingCard === card.id}
//                 isSelected={selectedCard === card.id}
//                 editText={editText}
//                 onEditChange={onEditChange}
//                 onEditBlur={() => setEditingCard(null)}
//                 onEditKeyDown={(e) => {
//                   if (e.key === "Enter") setEditingCard(null);
//                 }}
//                 onCardClick={() => onCardSelect(card.id)}
//                 onCardDoubleClick={() =>
//                   onCardDoubleClick(card.id, card.title)
//                 }
//                 onDeleteClick={() =>
//                   addMultipleOutlines?.(
//                     outlines
//                       .filter((c) => c.id !== card.id)
//                       .map((c, idx) => ({ ...c, order: idx + 1 }))
//                   )
//                 }
//                 moveCard={moveCard}
//               />
//         <AddCardButton onAddCard={handleAddCard} />
//             </React.Fragment>
//           ))}
//         </AnimatePresence>
//       </motion.div>
//     </DndProvider>
//   );
// };

// export default CardList;




// ---------------------------------------------------------------------------------------------------------------------------

// "use client";

// import { OutlineCard } from "@/lib/types";
// import { AnimatePresence, motion } from "framer-motion";
// import React from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { v4 as uuidv4 } from "uuid";
// import Card from "./Card";
// import AddCardButton from "./AddCardButton";

// type Props = {
//   outlines: OutlineCard[];
//   selectedCard: string | null;
//   editingCard: string | null;
//   editText: string;
//   onEditChange: (value: string) => void;
//   onCardSelect: (id: string) => void;
//   onCardDoubleClick: (id: string, title: string) => void;
//   setEditText: (value: string) => void;
//   setEditingCard: (id: string | null) => void;
//   setSelectedCard: (id: string | null) => void;
//   addOutline?: (card: OutlineCard) => void;
//   addMultipleOutlines?: (cards: OutlineCard[]) => void;
//   updateCardTitle?: (id: string, newTitle: string) => void;
// };

// const CardList = ({
//   editText,
//   editingCard,
//   onCardDoubleClick,
//   onCardSelect,
//   onEditChange,
//   outlines,
//   selectedCard,
//   setEditText,
//   setEditingCard,
//   setSelectedCard,
//   addMultipleOutlines,
//   addOutline,
//   updateCardTitle,
// }: Props) => {
//   const moveCard = (dragIndex: number, hoverIndex: number) => {
//     const updatedCards = [...outlines];
//     const [movedCard] = updatedCards.splice(dragIndex, 1);
//     updatedCards.splice(hoverIndex, 0, movedCard);

//     addMultipleOutlines?.(
//       updatedCards.map((card, index) => ({ ...card, order: index + 1 }))
//     );
//   };

//   const handleAddCard = () => {
//     const newCard: OutlineCard = {
//       id: uuidv4(),
//       title: `New Slide`,
//       order: outlines.length + 1,
//     };
//     addOutline?.(newCard);
//   };

//   const handleEditSave = (id: string) => {
//     if (editingCard === id) {
//       if (editText.trim() !== "") {
//         updateCardTitle?.(id, editText);
//       }
//       setEditingCard(null);
//     }
//   };

//   const handleCardSelect = (id: string) => {
//     // ✅ Auto-save when switching slides
//     if (editingCard && editText.trim() !== "") {
//       updateCardTitle?.(editingCard, editText);
//     }
//     setSelectedCard(id);
//     setEditingCard(null);
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <motion.div className="space-y-2 -my-2">
//         <AnimatePresence>
//           {outlines.map((card, index) => (
//             <React.Fragment key={card.id}>
//               <Card
//                 index={index}
//                 card={card}
//                 isEditing={editingCard === card.id}
//                 isSelected={selectedCard === card.id}
//                 editText={editText}
//                 onEditChange={onEditChange}
//                 onEditBlur={() => handleEditSave(card.id)}
//                 onEditKeyDown={(e) => {
//                   if (e.key === "Enter") handleEditSave(card.id);
//                 }}
//                 onCardClick={() => handleCardSelect(card.id)}
//                 onCardDoubleClick={() =>
//                   onCardDoubleClick(card.id, card.title)
//                 }
//                 onDeleteClick={() =>
//                   addMultipleOutlines?.(
//                     outlines
//                       .filter((c) => c.id !== card.id)
//                       .map((c, idx) => ({ ...c, order: idx + 1 }))
//                   )
//                 }
//                 moveCard={moveCard}
//               />
//             </React.Fragment>
//           ))}
//         </AnimatePresence>
//         <AddCardButton onAddCard={handleAddCard} />
//       </motion.div>
//     </DndProvider>
//   );
// };

// export default CardList;
