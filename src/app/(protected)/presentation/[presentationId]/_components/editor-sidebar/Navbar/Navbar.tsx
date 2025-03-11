"use client";

import { Button } from "@/components/ui/button";
import { useSlideStore } from "@/store/useSlideStore";
import { Home, Play, Share } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import PresentationMode from "./PresentationMode";

type Props = {
  presentationId: string;
};

const Navbar = ({ presentationId }: Props) => {
  const { currentTheme } = useSlideStore();
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  // console.log(currentTheme);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/share/${presentationId}`
    );
    toast.success("Link copied", { description: "Link Copied to Clipboard" });
  };
  return (
    <nav
      className="fixed top-0 right-0 z-50 w-full h-20 flex justify-between items-center px-7 py-4 border-b"
      style={{
        backgroundColor:
          currentTheme.navbarColor || currentTheme.backgroundColor,
        color: currentTheme.accentColor,
      }}
    >
      {/* Return Home Button */}
      <Link href={"/dashboard"} passHref>
        <Button
          variant={"outline"}
          className="flex items-center gap-2"
          style={{
            backgroundColor: currentTheme.backgroundColor,
          }}
        >
          {/* Return Home Button Icon */}
          <Home />
          {/* Return Home Button Text */}
          <span className="hidden sm:inline">Return Home</span>
        </Button>
      </Link>

      {/* Presentation Editor Button */}
      <Link
        href={"/presentation/template-market"}
        className="text-lg font-semibold hidden sm:block"
      >
        Presntation Editor
      </Link>

      {/* Copy Link and Present Button */}
      <div className="flex items-center gap-4">
        <Button
          variant={"outline"}
          onClick={handleCopy}
          style={{
            backgroundColor: currentTheme.backgroundColor,
          }}
        >
          <Share className="w-4 h-4" />
        </Button>

        {/* WIP: add lemon squeezy sell templates */}
        {/* <SellTemplate/> */}

        {/* Present Button */}
        <Button
          variant={"default"}
          className="flex items-center gap-2"
          onClick={() => setIsPresentationMode(true)}
        >
          <Play className="w-4 h-4 " />
          <span className="hidden sm:inline">Present</span>
        </Button>
      </div>

      {/* Presentation Mode */}
      {isPresentationMode && 
      <PresentationMode onClose={() => setIsPresentationMode(false)}/>}

      
    </nav>
  );
};

export default Navbar;
