// Original

import { generateLayouts } from "@/actions/ai";
import { Button } from "@/components/ui/button";
import { Theme } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2, Wand2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProgressModal from "@/components/ui/progress-modal";

// ThemePicker Component Props
type Props = {
  themes: Theme[];
  selectedTheme: Theme;
  onThemeSelect: (theme: Theme) => void;
};

// ThemePicker Component
const ThemePicker = ({ themes, selectedTheme, onThemeSelect }: Props) => {
  const router = useRouter();
  // Get the presentationId from the URL
  const params = useParams();

  const { project, setSlides, currentTheme } = useSlideStore();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const handleGenerateLayouts = async () => {
    setLoading(true);
    setShowProgress(true);
    setProgress(0);

    if (!selectedTheme) {
      toast.error("Error", { description: "Please select a theme" });
      setShowProgress(false);
      return;
    }

    if (project?.id === "") {
      toast.error("Error", { description: "Please create a project" });
      router.push("/create-page");
      setShowProgress(false);
      return;
    }

    try {
      // Calculate total steps based on outlines
      const totalSteps = project?.outlines?.length || 0;
      const stepIncrement = 100 / (totalSteps + 1); // +1 for initialization

      // Update progress for initialization
      setProgress(stepIncrement);

      const res = await generateLayouts(
        params.presentationId as string,
        currentTheme.name
      );

      // Simulate progress for each outline
      for (let i = 0; i < totalSteps; i++) {
        setProgress((prev) => Math.min(prev + stepIncrement, 99));
        await new Promise(resolve => setTimeout(resolve, 500)); // Add delay for visual feedback
      }

      if (res.status !== 200 || !res.data) {
        throw new Error("error" in res ? res.error : "Failed to generate layouts");
      }

      setProgress(100);
      await new Promise(resolve => setTimeout(resolve, 500)); // Show 100% briefly

      toast.success("Success", {
        description: "Layouts generated successfully",
      });

      // Redirect to the presentation page
      router.push(`/presentation/${project?.id}`);
      setSlides(res.data);
    } catch (error) {
      // If an error occurs, show an error message
      console.error("Error generating layouts:", error);
      toast.error("Error", { description: "Failed to generate layouts" });
    } finally {
      // Set the loading state to false
      setLoading(false);
      setShowProgress(false);
      setProgress(0);
    }
  };

  return (
    <>
      <ProgressModal
        open={showProgress}
        progress={progress}
        message="Generating Presentation Layouts..."
      />
      {/*  ThemePicker Container */}
      <div
        className="w-[400px] overflow-hidden sticky top-0 h-screen flex flex-col"
        style={{
          backgroundColor:
            selectedTheme.slideBackgroundColor || selectedTheme.backgroundColor,
          borderLeft: `1px solid ${selectedTheme.accentColor}20`,
        }}
      >
        {/* ThemePicker Header */}
        <div className="p-8 space-y-6 flex-shrink-0">
          <div className="space-y-2">
            {/* ThemePicker Header Title */}
            <h2
              className="text-3xl font-bold tracking-tight"
              style={{ color: selectedTheme.accentColor }}
            >
              Pick a Theme
            </h2>
            {/* ThemePicker Header Description */}
            <p
              className="text-sm"
              style={{ color: `${selectedTheme.accentColor}80` }}
            >
              Choose from our curated collection or generate a custom theme
            </p>
          </div>

          {/* ThemePicker Generate Layouts Button */}
          <Button
            className="w-full h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              backgroundColor: selectedTheme.accentColor,
              color: selectedTheme.backgroundColor,
            }}
            onClick={handleGenerateLayouts}
          >
            {/* ThemePicker Generate Layouts Button Icon */}
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-5 w-5" />
            )}
              {/* ThemePicker Generate Layouts Button Text */}
            {loading ? (
              <p className="animate-pulse">Generating...</p>
            ) : (
              "Generated Theme"
            )}
          </Button>
        </div>

        {/* ThemePicker Scroll and secect section */}
        <ScrollArea className="flex-grow px-8 pb-8">
          <div className="grid grid-cols-1 gap-4">
            {/* ThemePicker Scroll and secect section */}
            {themes.map((theme) => (
              <motion.div
                key={theme.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* ThemePicker Theme Card */}
                <Button
                  onClick={() => {
                    onThemeSelect(theme);
                  }}
                  className="flex flex-col items-center justify-start p-6 w-full h-auto"
                  style={{
                    fontFamily: theme.fontFamily,
                    color: theme.fontColor,
                    background: theme.gradientBackground || theme.backgroundColor,
                  }}
                >
                  {/* ThemePicker Theme Card Header */}
                  <div className="w-full flex items-center justify-between">
                    <span className="text-xl font-bold">{theme.name}</span>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.accentColor }}
                    />
                  </div>
                  {/* ThemePicker Theme Card Body */}
                  <div className="space-y-1 w-full">
                    <div
                      className="text-2xl font-bold"
                      style={{ color: theme.accentColor }}
                    >
                      Title
                    </div>
                    <div className="text-base opacity-80">
                      Body &{" "}
                      <span style={{ color: theme.accentColor }}>link</span>
                    </div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default ThemePicker;








// Original

// import { generateLayouts } from "@/actions/ai";
// import { Button } from "@/components/ui/button";
// import { Theme } from "@/lib/types";
// import { useSlideStore } from "@/store/useSlideStore";
// import { Loader2, Wand2 } from "lucide-react";
// import { useParams, useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { toast } from "sonner";
// import { motion } from "framer-motion";
// import { ScrollArea } from "@/components/ui/scroll-area";

// // ThemePicker Component Props
// type Props = {
//   themes: Theme[];
//   selectedTheme: Theme;
//   onThemeSelect: (theme: Theme) => void;
// };

// // ThemePicker Component
// const ThemePicker = ({ themes, selectedTheme, onThemeSelect }: Props) => {
//   const router = useRouter();
//   // Get the presentationId from the URL
//   const params = useParams();

//   const { project, setSlides, currentTheme } = useSlideStore();
//   const [loading, setLoading] = useState(false);

//   // Handle the generate layouts button
//   const handleGenerateLayouts = async () => {
//     setLoading(true);

//     // If no theme is selected, show an error
//     if (!selectedTheme) {
//       toast.error("Error", { description: "Please select a theme" });
//       return;
//     }

//     // If no project is created, show an error
//     if (project?.id === "") {
//       toast.error("Error", { description: "Please create a project" });
//       router.push("/create-page");
//       return;
//     }

//     // Generate the layouts
//     try {
//       const res = await generateLayouts(
//         params.presentationId as string,
//         currentTheme.name
//       );

//       // If the response is not successful, throw an error
//       if (res.status !== 200 || !res.data) {
//         throw new Error("error" in res ? res.error : "Failed to generate layouts");
//       }

//       // Show a success message
//       toast.success("Success", {
//         description: "Layouts generated successfully",
//       });

//       // Redirect to the presentation page
//       router.push(`/presentation/${project?.id}`);
//       setSlides(res.data);
//     } catch (error) {
//       // If an error occurs, show an error message
//       console.error("Error generating layouts:", error);
//       toast.error("Error", { description: "Failed to generate layouts" });
//     } finally {
//       // Set the loading state to false
//       setLoading(false);
//     }
//   };

//   return (
//     // ThemePicker Container
//     <div
//       className="w-[400px] overflow-hidden sticky top-0 h-screen flex flex-col"
//       style={{
//         backgroundColor:
//           selectedTheme.slideBackgroundColor || selectedTheme.backgroundColor,
//         borderLeft: `1px solid ${selectedTheme.accentColor}20`,
//       }}
//     >
//       {/* ThemePicker Header */}
//       <div className="p-8 space-y-6 flex-shrink-0">
//         <div className="space-y-2">
//           {/* ThemePicker Header Title */}
//           <h2
//             className="text-3xl font-bold tracking-tight"
//             style={{ color: selectedTheme.accentColor }}
//           >
//             Pick a Theme
//           </h2>
//           {/* ThemePicker Header Description */}
//           <p
//             className="text-sm"
//             style={{ color: `${selectedTheme.accentColor}80` }}
//           >
//             Choose from our curated collection or generate a custom theme
//           </p>
//         </div>

//         {/* ThemePicker Generate Layouts Button */}
//         <Button
//           className="w-full h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
//           style={{
//             backgroundColor: selectedTheme.accentColor,
//             color: selectedTheme.backgroundColor,
//           }}
//           onClick={handleGenerateLayouts}
//         >
//           {/* ThemePicker Generate Layouts Button Icon */}
//           {loading ? (
//             <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//           ) : (
//             <Wand2 className="mr-2 h-5 w-5" />
//           )}
//             {/* ThemePicker Generate Layouts Button Text */}
//           {loading ? (
//             <p className="animate-pulse">Generating...</p>
//           ) : (
//             "Generated Theme"
//           )}
//         </Button>
//       </div>

//       {/* ThemePicker Scroll and secect section */}
//       <ScrollArea className="flex-grow px-8 pb-8">
//         <div className="grid grid-cols-1 gap-4">
//           {/* ThemePicker Scroll and secect section */}
//           {themes.map((theme) => (
//             <motion.div
//               key={theme.name}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               {/* ThemePicker Theme Card */}
//               <Button
//                 onClick={() => {
//                   onThemeSelect(theme);
//                 }}
//                 className="flex flex-col items-center justify-start p-6 w-full h-auto"
//                 style={{
//                   fontFamily: theme.fontFamily,
//                   color: theme.fontColor,
//                   background: theme.gradientBackground || theme.backgroundColor,
//                 }}
//               >
//                 {/* ThemePicker Theme Card Header */}
//                 <div className="w-full flex items-center justify-between">
//                   <span className="text-xl font-bold">{theme.name}</span>
//                   <div
//                     className="w-3 h-3 rounded-full"
//                     style={{ backgroundColor: theme.accentColor }}
//                   />
//                 </div>
//                 {/* ThemePicker Theme Card Body */}
//                 <div className="space-y-1 w-full">
//                   <div
//                     className="text-2xl font-bold"
//                     style={{ color: theme.accentColor }}
//                   >
//                     Title
//                   </div>
//                   <div className="text-base opacity-80">
//                     Body &{" "}
//                     <span style={{ color: theme.accentColor }}>link</span>
//                   </div>
//                 </div>
//               </Button>
//             </motion.div>
//           ))}
//         </div>
//       </ScrollArea>
//     </div>
//   );
// };

// export default ThemePicker;

