"use client";

import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

// Theme Switcher Component
const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Effect to set the mounted state to true
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div>
      {/* Switch Component */}
      <Switch
        checked={theme === "light"}
        className="h-10 w-20 pl-1 data-[state=checked]:bg-primary-80"
        aria-label="Toggle dark mode"
        onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
    </div>
  );
};

export default ThemeSwitcher;
