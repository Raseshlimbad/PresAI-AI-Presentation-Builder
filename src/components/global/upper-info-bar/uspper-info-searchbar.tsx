'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSlideStore } from "@/store/useSlideStore";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const SearchBar = () => {
  const { projects, setFilteredProjects } = useSlideStore();
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Handle input change and filter projects in real-time
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter projects whenever search term or projects change
  useEffect(() => {
    const filtered = projects.filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchTerm, projects, setFilteredProjects]);

  return (
    <div className="min-w-[60%] relative flex items-center border rounded-full bg-primary-90">
      <Button
        type="submit"
        size="sm"
        variant="ghost"
        className="absolute left-0 h-full rounded-l-none bg-transparent hover:bg-transparent"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
      <Input
        type="text"
        placeholder="Search by title"
        className="flex-grow bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 ml-6"
      />
    </div>
  );
};

export default SearchBar;
