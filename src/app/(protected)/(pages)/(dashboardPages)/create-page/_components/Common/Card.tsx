import { Button } from "@/components/ui/button";
import { Card as UICard } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { OutlineCard } from "@/lib/types";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

import React, { useRef } from "react";

// Card Props Type
type Props = {
  card: OutlineCard;
  isEditing: boolean;
  isSelected: boolean;
  editText: string;
  onEditChange: (value: string) => void;
  onEditBlur: () => void;
  onEditKeyDown: (e: React.KeyboardEvent) => void;
  onCardClick: () => void;
  onCardDoubleClick: () => void;
  onDeleteClick: () => void;
  dragHandlers: {
    onDragStart: (e: React.DragEvent) => void;
    onDragEnd: () => void;
  };
  onDragOver: (e: React.DragEvent) => void;
  dragOverStyles: React.CSSProperties;
};

// Card Component
const Card = ({
  card,
  isEditing,
  isSelected,
  editText,
  onEditChange,
  onEditBlur,
  onEditKeyDown,
  onCardClick,
  onCardDoubleClick,
  onDeleteClick,
  dragHandlers,
  onDragOver,
  dragOverStyles,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Render the Card
  return (
    // Motion.div for the container
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 1 }}
      className="relative"
    >
      {/* Div for the card */}
      <div
        draggable
        onDragOver={onDragOver}
        style={dragOverStyles}
        {...dragHandlers}
      >
        {/* UICard for the card */}
        <UICard
          className={`p-4 cursor-grab active:cursor-grabbing bg-primary-90 ${
            isEditing || isSelected ? "border-primary bg-transparent" : ""
          }`}
          onClick={onCardClick}
          onDoubleClick={onCardDoubleClick}
        >
          {/* Div for the card content */}
          <div className="flex items-center justify-between">
            {/* If the card is editing, render the input */}
            {isEditing ? (
              <Input
                ref={inputRef}
                value={editText}
                onChange={(e) => onEditChange(e.target.value)}
                onBlur={onEditBlur}
                onKeyDown={onEditKeyDown}
                className="text-base sm:text-lg"
              />
            ) : (
              // Div for the card order and title
              <div className="flex items-center gap-2">
                {/* Span for the card order */}
                <span
                  className={`text-base sm:text-lg py-1 px-4 rounded-xl bg-primary-20 ${
                    isEditing || isSelected
                      ? "bg-secondary-90 dark:text-black"
                      : ""
                  }`}
                >
                  {/* Card Order */}
                  {card.order}
                </span>
                {/* Card Title */}
                <span className="text-base sm:text-lg">{card.title}</span>
              </div>
            )}
            {/* Button for the delete card */}
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick();
              }}
              aria-label={`Delete card ${card.order}`}
            >
              {/* Trash2 Icon */}
              <Trash2 className="size-4" />
            </Button>
          </div>
        </UICard>
      </div>
    </motion.div>
  );
};
export default Card;



// ---------------------------------------------------------------------------------------------------------------------------



// import { Button } from "@/components/ui/button";
// import { Card as UICard } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { OutlineCard } from "@/lib/types";
// import { motion } from "framer-motion";
// import { Trash2 } from "lucide-react";
// import React, { useRef } from "react";
// import { useDrag, useDrop } from "react-dnd";

// type Props = {
//   card: OutlineCard;
//   isEditing: boolean;
//   isSelected: boolean;
//   editText: string;
//   onEditChange: (value: string) => void;
//   onEditBlur: () => void;
//   onEditKeyDown: (e: React.KeyboardEvent) => void;
//   onCardClick: () => void;
//   onCardDoubleClick: () => void;
//   onDeleteClick: () => void;
//   moveCard: (dragIndex: number, hoverIndex: number) => void;
//   index: number;
// };

// const Card = ({
//   card,
//   isEditing,
//   isSelected,
//   editText,
//   onEditChange,
//   onEditBlur,
//   onEditKeyDown,
//   onCardClick,
//   onCardDoubleClick,
//   onDeleteClick,
//   moveCard,
//   index,
// }: Props) => {
//   const inputRef = useRef<HTMLInputElement>(null);

//   const [{ isDragging }, dragRef] = useDrag({
//     type: "CARD",
//     item: { index },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   const [, dropRef] = useDrop({
//     accept: "CARD",
//     hover: (item: { index: number }) => {
//       if (item.index !== index) {
//         moveCard(item.index, index);
//         item.index = index;
//       }
//     },
//   });

//   return (
//     <motion.div
//       ref={(node) => {
//         if (node) {
//           dragRef(dropRef(node));
//         }
//       }}
//       layout
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ type: "spring", stiffness: 500, damping: 30, mass: 1 }}
//       className={`relative ${isDragging ? "opacity-50" : ""}`}
//     >
//       <UICard
//         className={`p-4 cursor-grab active:cursor-grabbing bg-primary-90 ${
//           isEditing || isSelected ? "border-primary bg-transparent" : ""
//         }`}
//         onClick={onCardClick}
//         onDoubleClick={onCardDoubleClick}
//       >
//         <div className="flex items-center justify-between">
//           {isEditing ? (
//             <Input
//               ref={inputRef}
//               value={editText}
//               onChange={(e) => onEditChange(e.target.value)}
//               onBlur={onEditBlur}
//               onKeyDown={onEditKeyDown}
//               className="text-base sm:text-lg"
//             />
//           ) : (
//             <div className="flex items-center gap-2">
//               <span
//                 className={`text-base sm:text-lg py-1 px-4 rounded-xl bg-primary-20 ${
//                   isEditing || isSelected
//                     ? "bg-secondary-90 dark:text-black"
//                     : ""
//                 }`}
//               >
//                 {card.order}
//               </span>
//               <span className="text-base sm:text-lg">{card.title}</span>
//             </div>
//           )}
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={(e) => {
//               e.stopPropagation();
//               onDeleteClick();
//             }}
//             aria-label={`Delete card ${card.order}`}
//           >
//             <Trash2 className="size-4" />
//           </Button>
//         </div>
//       </UICard>
//     </motion.div>
//   );
// };

// export default Card;




// ---------------------------------------------------------------------------------------------------------------------------

// import { Button } from "@/components/ui/button";
// import { Card as UICard } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { OutlineCard } from "@/lib/types";
// import { motion } from "framer-motion";
// import { Trash2 } from "lucide-react";
// import React, { useEffect, useRef } from "react";
// import { useDrag, useDrop } from "react-dnd";

// type Props = {
//   card: OutlineCard;
//   isEditing: boolean;
//   isSelected: boolean;
//   editText: string;
//   onEditChange: (value: string) => void;
//   onEditBlur: () => void;
//   onEditKeyDown: (e: React.KeyboardEvent) => void;
//   onCardClick: () => void;
//   onCardDoubleClick: () => void;
//   onDeleteClick: () => void;
//   moveCard: (dragIndex: number, hoverIndex: number) => void;
//   index: number;
// };

// const Card = ({
//   card,
//   isEditing,
//   isSelected,
//   editText,
//   onEditChange,
//   onEditBlur,
//   onEditKeyDown,
//   onCardClick,
//   onCardDoubleClick,
//   onDeleteClick,
//   moveCard,
//   index,
// }: Props) => {
//   const inputRef = useRef<HTMLInputElement>(null);

//   const [{ isDragging }, dragRef] = useDrag({
//     type: "CARD",
//     item: { index },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   const [, dropRef] = useDrop({
//     accept: "CARD",
//     hover: (item: { index: number }) => {
//       if (item.index !== index) {
//         moveCard(item.index, index);
//         item.index = index;
//       }
//     },
//   });

//   // Focus input automatically when editing
//   useEffect(() => {
//     if (isEditing) {
//       inputRef.current?.focus();
//     }
//   }, [isEditing]);

//   return (
//     <motion.div
//       ref={(node) => {
//         if (node) {
//           dragRef(dropRef(node));
//         }
//       }}
//       layout
//       className={`relative ${isDragging ? "opacity-50" : ""}`}
//     >
//       <UICard
//         className={`p-4 ${
//           isEditing || isSelected ? "border-primary" : ""
//         }`}
//         onClick={onCardClick}
//         onDoubleClick={onCardDoubleClick}
//       >
//         <div className="flex items-center justify-between">
//           {isEditing ? (
//             <Input
//               ref={inputRef}
//               value={editText}
//               onChange={(e) => onEditChange(e.target.value)}
//               onBlur={onEditBlur}
//               onKeyDown={onEditKeyDown}
//             />
//           ) : (
//             <span>{card.title}</span>
//           )}
//           <Button onClick={onDeleteClick}>
//             <Trash2 />
//           </Button>
//         </div>
//       </UICard>
//     </motion.div>
//   );
// };

// export default Card;
