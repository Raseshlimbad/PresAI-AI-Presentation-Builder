import { OutlineCard } from '@/lib/types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// Page Type
type page = 'create' | 'creative-ai' | 'create-scratch'

// Prompt Type
type Prompt = {
    id: string
    createdAt: string
    title: string
    outlines: OutlineCard[] | []
}

// Prompt Store Type
type PromptStore = {
    page: page
    setPage: (page: page) => void
    prompts: Prompt[]
    addPrompt: (prompt: Prompt) => void
    removePrompt: (id: string) => void
}

// Prompt Store
const usePromptStore = create<PromptStore>()(
    devtools(
      persist(
        // Set the store
        (set) => ({
          // Page
          page: 'create',
          // Set the page
          setPage: (page: page) => {
            set({ page });
          },
          // Prompts
          prompts: [],
          // Add Prompt
          addPrompt: (prompt: Prompt) => {
            set((state) => ({
              prompts: [prompt, ...state.prompts],
            }));
          },
          // Remove Prompt
          removePrompt: (id: string) => {
            set((state) => ({
              prompts: state.prompts.filter((prompt) => prompt.id !== id),
            }));
          },
        }),
        // Persist the store
        { name: 'prompts' }
      )
    )
  );
  


export default usePromptStore
