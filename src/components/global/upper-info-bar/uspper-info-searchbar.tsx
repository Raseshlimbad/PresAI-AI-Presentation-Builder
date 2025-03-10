'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const SearchBar = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '');

  // Handle Search Input
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Update URL with search term
    router.push(`?search=${value}`, { scroll: false });
  };

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
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by title"
        className="flex-grow bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 ml-6"
      />
    </div>
  );
};

export default SearchBar;
