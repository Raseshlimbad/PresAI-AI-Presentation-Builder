"use client";

import { Button } from "@/components/ui/button";
import { useSlideStore } from "@/store/useSlideStore";
import { Home } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  presentationId: string;
};

const Navbar = ({ presentationId }: Props) => {
  const { currentTheme } = useSlideStore();
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  console.log(currentTheme);
  return (
    <nav
      className="fixed top-0 right-0 z-50 w-full h-20 flex justify-between items-center px-7 py-4 border-b"
      style={{
        backgroundColor:
          currentTheme.navbarColor || currentTheme.backgroundColor,
        color: currentTheme.accentColor,
      }}
    >
      <Link href={"/dashboard"} passHref>
        <Button
          variant={"outline"}
          className="flex items-center gap-2"
          style={{
            backgroundColor: currentTheme.backgroundColor,
          }}
        >
          <Home />
          <span className="hidden sm:inline">Return Home</span>
        </Button>
      </Link>
      Navbar component
    </nav>
  );
};

export default Navbar;
