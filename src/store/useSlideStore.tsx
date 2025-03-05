import { ContentItem, Slide, Theme } from "@/lib/types";
import { Project } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

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

const defaultTheme: Theme = {
  name: "Default",
  fontFamily: '"Inter", sans-serif',
  fontColor: "#333333",
  backgroundColor: "#f0f0f0",
  slideBackgroundColor: "#ffffff",
  accentColor: "#3b82f6",
  type: "light",
};

export const useSlideStore = create(
  persist<SlideState>(
    (set, get) => ({
      slides: [],
      project: null,
      currentSlide: 0,

      setSlides: (slides: Slide[]) => set({ slides }),

      setCurrentSlide: (index: number) => set({ currentSlide: index }),

      updateContentItem: (slideId, contentId, newContent) => {
        set((state) => {
          const updateContentRecursively = (item: ContentItem): ContentItem => {
            if (item.id === contentId) {
              return { ...item, content: newContent };
            }

            if (
              Array.isArray(item.content) &&
              item.content.every((i) => typeof i !== "string")
            ) {
              return {
                ...item,
                content: item.content.map((subItem) =>
                  typeof subItem !== "string"
                    ? updateContentRecursively(subItem as ContentItem)
                    : subItem
                ) as ContentItem[],
              };
            }

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

          return {
            slides: state.slides.map((slide) =>
              slide.id === slideId
                ? {
                    ...slide,
                    content: updateContentRecursively(slide.content),
                  }
                : slide
            ),
          };
        });
      },

      setProject: (project: Project) => set({ project }),

      currentTheme: defaultTheme,

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
      
      addComponentInSlide: (
        slideId: string,
        item: ContentItem,
        index: number,
        parentId?: string
      ) => {
        set((state) => {
          const updatedSlides = state.slides.map((slide) => {
            if (slide.id === slideId) {
              const updateContentRecursively = (
                content: ContentItem
              ): ContentItem => {
                if (content.id === parentId && Array.isArray(content.content)) {
                  const updatedContent = [...content.content];
                  updatedContent.splice(index, 0, item);

                  return {
                    ...content,
                    content: updatedContent as unknown as string[],
                  };
                }
                return content;
              };
              return {
                ...slide,
                content: updateContentRecursively(slide.content),
              };
            }
            return slide;
          });
          return {
            slides: updatedSlides,
          };
        });
      },
      reorderSlides: (fromIndex: number, toIndex: number) => {
        set((state) => {
          const newSlides = [...state.slides];
          const [removed] = newSlides.splice(fromIndex, 1);
          newSlides.splice(toIndex, 0, removed);
          return {
            slides: newSlides.map((slide, index) => ({
              ...slide,
              slideOrder: index,
            })),
          };
        });
      },

      getOrderedSlides: () => {
        const state = get();
        return [...state.slides].sort((a, b) => a.slideOrder - b.slideOrder);
      },

      removeSlide: (id) =>
        set((state) => ({
          slides: state.slides.filter((slide) => slide.id !== id),
        })),

      addSlideAtIndex: (slide: Slide, index: number) =>
        set((state) => {
          const newSlides = [...state.slides];
          newSlides.splice(index, 0, { ...slide, id: uuidv4() });
          newSlides.forEach((s, i) => {
            s.slideOrder = i;
          });
          return {
            slides: newSlides,
            currentSlide: index,
          };
        }),
    }),
    {
      name: "slides-storage",
    }
  )
);
