import { updateTheme } from "@/actions/project";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { themes } from "@/lib/constants";
import { Theme } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { useTheme } from "next-themes";
import React from "react";
import { toast } from "sonner";

// Theme Chooser
const ThemeChooser = () => {
  const { currentTheme, setCurrentTheme, project } = useSlideStore();
  const { setTheme } = useTheme();

  // Handle Change Theme
  const handleChangeTheme = async (theme: Theme) => {
    // Check if project exists
    if(!project){
        toast.error('Error',{
            description: 'Failed to update theme',
        })
        return;
    }

    // Set Theme
    setTheme(theme.type);
    setCurrentTheme(theme);

    // Show Success Toast
    toast.success('Success',{
        description: 'Theme updated successfully',
    })

    // Update Theme in database
    try {
        // Update Theme in database
        const res = await updateTheme(project.id, theme.name);

        // Check if update was successful
        if(res.status !== 200){
            throw new Error('Failed to update theme');
        }

        // Show Success Toast
        toast.success('Success',{
            description: 'Theme updated successfully',
        })
    } catch (error) {
        console.log(error);
        // Show Error Toast
        toast.error('Error',{
            description: 'Failed to update theme',
        })
    }
  }
  return (
    // Scroll Area - Theme Chooser
    <ScrollArea className="h-[400px] p-8"
    style={{
        backgroundColor: currentTheme.slideBackgroundColor,
      }}>
      {/* Themes */}
      <div className="mb-4 text-center font-bold">Themes</div>
      {/* Themes Container */}
      <div className="flex flex-col space-y-4"
      >
        {/* Theme Item */}
        {themes.map((theme) => (
            // Button - Theme Item
          <Button
            key={theme.name}
            onClick={() => handleChangeTheme(theme)}
            variant={currentTheme.name === theme.name ? "default" : "outline"}
            className="flex flex-col items-center justify-start px-4 w-full h-auto"
            style={{
              fontFamily: theme.fontFamily,
              color: theme.fontColor,
              background: theme.gradientBackground || theme.backgroundColor,
            }}
          >
            {/* Theme Item Container */}
            <div className="w-full flex items-center justify-between">
              {/* Theme Item Name */}
              <span className="text-xl font-bold">{theme.name}</span>

              {/* Theme Item Accent Color */}
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: theme.accentColor }}
              />
            </div>

            {/* Theme Item Content */}
            <div className="space-y-1 w-full">
              {/* Theme Item Title */}
              <div
                className="text-2xl font-bold"
                style={{ color: theme.accentColor }}
              >
                Title
              </div>
              {/* Theme Item Body */}
              <div className="text-base opacity-80">
                Body & <span style={{ color: theme.accentColor}}>link</span>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ThemeChooser;
