import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Outline Store Type
type OutlineStore = {
    outlines: OutlineCard[];
    resetOutlines: () => void;
    addOutline: (outline: OutlineCard) => void;
    addMultipleOutlines: (outlines: OutlineCard[]) => void;
  };

// Outline Store
const useScratchStore = create<OutlineStore>()(
    devtools(
      persist(
        (set) => ({
          // Outlines
          outlines: [],
          // Reset Outlines
          resetOutlines: () => {
            set({ outlines: [] });
          },
          // Add Outline
          addOutline: (outline: OutlineCard) => {
            set((state) => ({
              outlines: [...state.outlines, outline],
            }));
          },
          // Add Multiple Outlines
            addMultipleOutlines: (outlines: OutlineCard[]) => {
            set(() => ({
              outlines: [...outlines],
            }));
          },
        }),
        // Persist the store
        { name: "scratch" }
      )
    )
  );

export default useScratchStore;
