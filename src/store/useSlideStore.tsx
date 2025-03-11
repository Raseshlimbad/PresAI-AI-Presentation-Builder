import { ContentItem, Slide, Theme } from "@/lib/types";
import { Project } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

// Slide State Type
interface SlideState {
  slides: Slide[];
  currentSlide: number;
  setSlides: (slides: Slide[]) => void;
  setCurrentSlide: (index: number) => void;
  addSlideAtIndex: (slide: Slide, index: number) => void;
  removeSlide: (id: string) => void;
  project: Project | null;
  setProject: (project: Project) => void;
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
  getOrderedSlides: () => Slide[];
  reorderSlides: (fromIndex: number, toIndex: number) => void;
  updateContentItem: (
    slideId: string,
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  addComponentInSlide: (
    slideId: string,
    item: ContentItem,
    index: number,
    parentId?: string
  ) => void;
}

// Default Theme
const defaultTheme: Theme = {
  name: "Default",
  fontFamily: '"Inter", sans-serif',
  fontColor: "#333333",
  backgroundColor: "#f0f0f0",
  slideBackgroundColor: "#ffffff",
  accentColor: "#3b82f6",
  type: "light",
};

// Slide Store
export const useSlideStore = create(
  persist<SlideState>(
    // Persist the store
    (set, get) => ({
      // Slides
      slides: [],
      // Current Slide
      currentSlide: 0,
      // Project
      project: null,
      // Current Theme
      // Set Slides
      setSlides: (slides: Slide[]) => set({ slides }),

      // Set Current Slide
      setCurrentSlide: (index: number) => set({ currentSlide: index }),

      updateContentItem: (slideId, contentId, newContent) => {
        set((state) => {
          // Update Content Recursively
          const updateContentRecursively = (item: ContentItem): ContentItem => {
            // If the item id matches the content id, return the item with the new content
            if (item.id === contentId) {
              return { ...item, content: newContent };
            }

            // If the item content is an array and every item is not a string, return the item with the new content
            if (
              Array.isArray(item.content) &&
              item.content.every((i) => typeof i !== "string")
            ) {
              // Map through the item content and update the content recursively
              return {
                ...item,
                // Map through the item content and update the content recursively
                content: item.content.map((subItem) =>
                  typeof subItem !== "string"
                    ? updateContentRecursively(subItem as ContentItem)
                    : subItem
                ) as ContentItem[],
              };
            }

            // Return the item
            return item;
          };

          // return {
          //   slides: state.slides.map((slide) =>
          //     slide.id === slideId
          //       ? {
          //           ...slide,
          //           content: Array.isArray(slide.content)
          //             ? slide.content.map((item) =>
          //                 updateContentRecursively(item as ContentItem)
          //               )
          //             : slide.content,
          //         }
          //       : slide
          //   ),
          // };

          // Return the updated slides
          return {
            // Map through the slides and update the content recursively
            slides: state.slides.map((slide) =>
              // If the slide id matches the slide id, return the slide with the updated content
              slide.id === slideId
                ? {
                    ...slide,
                    // Update the content recursively
                    content: updateContentRecursively(slide.content),
                  }
                // Otherwise, return the slide
                : slide
            ),
          };
        });
      },

      // Set Project
      setProject: (project: Project) => set({ project }),

      // Current Theme
      currentTheme: defaultTheme,

      // Set Current Theme
      setCurrentTheme: (theme: Theme) => set({ currentTheme: theme }),

      // addComponentInSlide with all comments 
      // addComponentInSlide: (
      //   slideId: string,    // ID of the slide where the item should be added
      //   item: ContentItem,  // The new content item to insert
      //   index: number,      // The position where the item should be inserted
      //   parentId?: string   // (Optional) ID of the parent content item, if inserting into nested content
      // ) => {
      //   set((state) => {
      //     // Map through the slides to find the one that needs updating
      //     const updatedSlides = state.slides.map((slide) => {
      //       if (slide.id === slideId) {
              
      //         // Recursive function to traverse content structure and insert the new item
      //         const updateContentRecursively = (content: ContentItem): ContentItem => {
      //           // If the current content matches the parentId and contains an array of content
      //           if (content.id === parentId && Array.isArray(content.content)) {
      //             const updatedContent = [...content.content]; // Clone existing content array
      //             updatedContent.splice(index, 0, item); // Insert the new item at the specified index
      
      //             return {
      //               ...content,  // Preserve existing properties
      //               content: updatedContent as unknown as string[], // Update content with new item
      //             };
      //           }
      //           return content; // If no match, return content unchanged
      //         };
      
      //         // Return the updated slide with modified content
      //         return {
      //           ...slide,
      //           content: updateContentRecursively(slide.content),
      //         };
      //       }
      //       return slide; // If slideId doesn't match, return slide unchanged
      //     });
      
      //     // Update the state with the new slides array
      //     return {
      //       slides: updatedSlides,
      //     };
      //   });
      // },
      
      // Add Component In Slide
      addComponentInSlide: (
        slideId: string,
        item: ContentItem,
        index: number,
        parentId?: string
      ) => {
        // Set the slides
        set((state) => {
          // Map through the slides and update the content recursively
          const updatedSlides = state.slides.map((slide) => {
            // If the slide id matches the slide id, return the slide with the updated content
            if (slide.id === slideId) {
              // Update Content Recursively
              const updateContentRecursively = (
                content: ContentItem
              ): ContentItem => {
                // If the current content matches the parentId and contains an array of content
                if (content.id === parentId && Array.isArray(content.content)) {
                  // Clone the existing content array
                    const updatedContent = [...content.content];
                  // Insert the new item at the specified index
                  updatedContent.splice(index, 0, item);

                  // Return the updated content
                  return {
                    ...content,
                    // Update the content with the new item
                    content: updatedContent as unknown as string[],
                  };
                }
                // Return the content
                return content;
              };
              // Return the updated slide
              return {
                ...slide,
                // Update the content recursively
                content: updateContentRecursively(slide.content),
              };
            }
            // Return the slide
            return slide;
          });
          // Return the updated slides
          return {
            slides: updatedSlides,
          };
        });
      },

      // Reorder Slides
      reorderSlides: (fromIndex: number, toIndex: number) => {
        // Set the slides
        set((state) => {  
          // Clone the slides
          const newSlides = [...state.slides];
          // Remove the item at the from index
          const [removed] = newSlides.splice(fromIndex, 1);
          // Insert the item at the to index
          newSlides.splice(toIndex, 0, removed);
          // Return the updated slides
          return {
            slides: newSlides.map((slide, index) => ({
              ...slide,
              slideOrder: index,
            })),
          };
        });
      },

      // Get Ordered Slides
      getOrderedSlides: () => {
        // Get the state
        const state = get();
        // Return the ordered slides
        return [...state.slides].sort((a, b) => a.slideOrder - b.slideOrder);
      },

      // removeSlide: (id) =>
      //   set((state) => ({
      //     slides: state.slides.filter((slide) => slide.id !== id),
      //   })),

      // Remove Slide
      removeSlide: (id) =>
        set((state) => {
          // Filter the slides
          const filteredSlides = state.slides.filter((slide) => slide.id !== id);
          
          // Reorder the slides to reset the index
          const reorderedSlides = filteredSlides.map((slide, index) => ({
            ...slide,
            slideOrder: index, // Reset the slide order
          }));
          // Return the updated slides
          return {
            slides: reorderedSlides,
            currentSlide: Math.max(state.currentSlide - 1, 0),
          };
        }),

      // Add Slide At Index
      addSlideAtIndex: (slide: Slide, index: number) =>
        set((state) => {
          // Clone the slides
          const newSlides = [...state.slides];
          // Insert the new slide at the specified index  
          newSlides.splice(index, 0, { ...slide, id: uuidv4() });
          // Reset the slide order
          newSlides.forEach((s, i) => {
            s.slideOrder = i;
          });
          // Return the updated slides
          return {
            slides: newSlides,
            currentSlide: index,
          };
        }),
    }),
    // Persist the store
    {
      name: "slides-storage",
    }
  )
);
