import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CreativeAiStore = {
  outlines: OutlineCard[] | [];
  addOutline: (outline: OutlineCard) => void;
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
  currentAiPrompt: string;
  setCurrentAiPrompt: (prompt: string) => void;
  resetOutlines: () => void;
};

const useCreativeAIStore = create<CreativeAiStore>()(
  persist(
    (set) => ({
      currentAiPrompt: "",
      outlines: [],
      addOutline: (outline: OutlineCard) => {
        set((state) => ({
          outlines: [outline, ...state.outlines],
        }));
      },
      addMultipleOutlines: (outlines: OutlineCard[]) => {
        set(() => ({
          outlines: [...outlines],
        }));
      },
      setCurrentAiPrompt: (prompt: string) => {
        set({
          currentAiPrompt: prompt,
        });
      },
      resetOutlines: () => {
        set({
          outlines: [],
        });
      },
    }),
    {
      name: "creative-ai", // storage key for the persisted store
    }
  )
);

export default useCreativeAIStore;
