import React from "react";

// Blank Card Icon
export function BlankCardIcon() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-3/4 h-2 bg-white rounded" />
    </div>
  );
}

// Image and Text Icon
export function ImageAndTextIcon() {
  return (
    <div className="w-full h-full flex gap-2">
      <div className="w-1/2 bg-white rounded" />
      <div className="w-1/2 flex flex-col gap-1">
        <div className="h-2 bg-white rounded w-full" />
        <div className="h-2 bg-white rounded w-2/3" />
      </div>
    </div>
  );
}

// Text and Image Icon
export function TextAndImageIcon() {
  return (
    <div className="w-full h-full flex gap-2">
      <div className="w-1/2 flex flex-col gap-1">
        <div className="h-2 bg-white rounded w-full" />
        <div className="h-2 bg-white rounded w-2/3" />
      </div>
      <div className="w-1/2 bg-white rounded" />
    </div>
  );
}

// Two Columns Icon
export function TwoColumnsIcon() {
  return (
    <div className="w-full h-full flex gap-3 flex-col items-center justify-center">
      <div className="w-full h-4 bg-white rounded" />
      <div className="w-full h-full flex gap-2">
        {Array.from({ length: 2 }, (_, i) => (
          <div className="w-1/2 flex flex-col gap-1" key={i}>
            <div className="h-2 bg-white rounded w-full" />
            <div className="h-2 bg-white rounded w-full" />
            <div className="h-2 bg-white rounded w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Three Columns Icon
export function ThreeColumnsIcon() {
  return (
    <div className="w-full h-full flex gap-3 flex-col items-center justify-center">
      <div className="w-full h-4 bg-white rounded" />
      <div className="w-full h-full flex gap-2">
        {Array.from({ length: 3 }, (_, i) => (
          <div className="w-1/2 flex flex-col gap-1" key={i}>
            <div className="h-2 bg-white rounded w-full" />
            <div className="h-2 bg-white rounded w-full" />
            <div className="h-2 bg-white rounded w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Four Columns Icon
export function FourColumnsIcon() {
  return (
    <div className="w-full h-full flex gap-3 flex-col items-center justify-center">
      <div className="w-full h-4 bg-white rounded" />
      <div className="w-full h-full flex gap-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div className="w-1/2 flex flex-col gap-1" key={i}>
            <div className="h-2 bg-white rounded w-full" />
            <div className="h-2 bg-white rounded w-full" />
            <div className="h-2 bg-white rounded w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Two Columns With Headings Icon
export function TwoColumnsWithHeadingsIcon() {
  return (
    <div className="w-full h-full flex gap-3 flex-col items-center justify-center">
      <div className="w-full h-4 bg-white rounded" />
      <div className="w-full h-full flex gap-2">
        {Array.from({ length: 2 }, (_, i) => (
          <div className="w-1/2 flex flex-col gap-1" key={i}>
            <div className="h-2 bg-white rounded w-full" />
            <div className="h-1 bg-white rounded w-full" />
            <div className="h-1 bg-white rounded w-full" />
            <div className="h-1 bg-white rounded w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Three Columns With Headings Icon
export function ThreeColumnsWithHeadingsIcon() {
  return (
    <div className="w-full h-full flex gap-3 flex-col items-center justify-center">
      <div className="w-full h-4 bg-white rounded" />
      <div className="w-full h-full flex gap-2">
        {Array.from({ length: 2 }, (_, i) => (
          <div className="w-1/2 flex flex-col gap-1" key={i}>
            <div className="h-2 bg-white rounded w-full" />
            <div className="h-1 bg-white rounded w-full" />
            <div className="h-1 bg-white rounded w-full" />
            <div className="h-1 bg-white rounded w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Bullets Icon
export function BulletsIcon() {
  return (
    <div className="w-full h-full flex flex-col gap-1">
      <div className="h-3 bg-gray-300 rounded w-3/4 mb-1" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex gap-2 items-center">
          <div className="w-1 h-1 bg-white rounded-full" />
          <div className="h-2 bg-white rounded flex-1" />
        </div>
      ))}
    </div>
  );
}

// Two Image Columns Icon
export function TwoImageColumnsIcon() {
  return (
    <div className="w-full h-full flex flex-col gap-1">
      <div className="w-full h-3 bg-white rounded" />
      <div className="w-full h-8 bg-white rounded flex justify-center items-center"></div>
      <div className="w-full h-full flex gap-2">
        {Array.from({ length: 2 }, (_, i) => (
          <div className="w-1/2 flex flex-col gap-1" key={i}>
            <div className="h-2 bg-white rounded w-full" />
            <div className="h-1 bg-white rounded w-full" />
            <div className="h-1 bg-white rounded w-full" />
            <div className="h-1 bg-white rounded w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Three Image Columns Icon
export function ThreeImageColumnsIcon() {
  return (
    <div className="w-full h-full flex flex-col gap-1">
      <div className="w-full h-3 bg-white rounded" />
      <div className="w-full h-8 bg-white rounded flex justify-center items-center"></div>
      <div className="w-full h-full flex gap-2">
        {Array.from({ length: 3 }, (_, i) => (
          <div className="w-1/2 flex flex-col gap-1" key={i}>
            <div className="h-2 bg-white rounded w-full" />
            <div className="h-1 bg-white rounded w-full" />
            <div className="h-1 bg-white rounded w-full" />
            <div className="h-1 bg-white rounded w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Four Image Columns Icon
export function FourImageColumnsIcon() {
  return (
    <div className="w-full h-full flex flex-col gap-1">
      <div className="w-full h-3 bg-white rounded" />
      <div className="w-full h-8 bg-white rounded flex justify-center items-center"></div>
      <div className="w-full h-full flex gap-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div className="w-1/2 flex flex-col gap-1" key={i}>
            <div className="h-2 bg-white rounded w-full" />
            <div className="h-1 bg-white rounded w-full" />
            <div className="h-1 bg-white rounded w-full" />
            <div className="h-1 bg-white rounded w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
