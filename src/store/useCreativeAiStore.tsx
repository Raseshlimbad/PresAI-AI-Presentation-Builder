import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Creative AI Store Type
type CreativeAiStore = {
  outlines: OutlineCard[] | [];
  addOutline: (outline: OutlineCard) => void;
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
  currentAiPrompt: string;
  setCurrentAiPrompt: (prompt: string) => void;
  resetOutlines: () => void;
};

// Creative AI Store
const useCreativeAIStore = create<CreativeAiStore>()(
  persist(
    // Set the store
    (set) => ({
      // Current AI Prompt
      currentAiPrompt: "",
      // Outlines
      outlines: [],
      // Add Outline
      addOutline: (outline: OutlineCard) => {
        set((state) => ({
          outlines: [outline, ...state.outlines],
        }));
      },
      // Add Multiple Outlines
      addMultipleOutlines: (outlines: OutlineCard[]) => {
        set(() => ({
          outlines: [...outlines],
        }));
      },
      // Set Current AI Prompt
      setCurrentAiPrompt: (prompt: string) => {
        set({
          currentAiPrompt: prompt,
        });
      },
      // Reset Outlines
      resetOutlines: () => {
        set({
          outlines: [],
        });
      },
    }),
    // Persist the store
    {
      name: "creative-ai", // storage key for the persisted store
    }
  )
);

export default useCreativeAIStore;
