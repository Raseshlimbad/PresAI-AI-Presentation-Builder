import React, { useState } from "react";
import { Layout, LayoutGrid, Search, PenTool, BookOpen, Frame, Network } from "lucide-react";
import { Category } from "@/lib/types";

type NavCategoryBarProps = {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onSearch: (query: string) => void; // Pass search query to parent
};

const NavCategoryBar = ({ categories, selectedCategory, onSelectCategory, onSearch }: NavCategoryBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Pass search query to parent
  };

  return (
    <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Search Bar */}
      <div className="p-4 flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange} // Call search function on input change
            placeholder="Search templates..."
            className="w-full p-2 pl-10 text-sm border rounded-md bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-800"
          />
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="flex space-x-4 px-6 py-2 overflow-x-auto text-sm text-gray-600 dark:text-gray-300">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
              selectedCategory === category.id
                ? "bg-black text-white dark:bg-white dark:text-black font-medium"
                : "hover:bg-gray-100 dark:hover:bg-[#262626]"
            }`}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.id === "all" && <Layout className="h-4 w-4" />}
            {category.id === "business" && <LayoutGrid className="h-4 w-4" />}
            {category.id === "creative" && <PenTool className="h-4 w-4" />}
            {category.id === "data" && <Network className="h-4 w-4" />}
            {category.id === "minimalist" && <Frame className="h-4 w-4" />}
            {category.id === "study" && <BookOpen className="h-4 w-4" />}
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavCategoryBar;
