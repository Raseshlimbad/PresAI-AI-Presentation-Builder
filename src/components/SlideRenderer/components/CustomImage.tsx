import Image from "next/image";
import React from "react";

interface CustomImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt = "image", className }) => {
  const staticUrl =
    "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
        <Image 
        src={staticUrl}
        alt={alt}
        width={500}
        height={500}
        className={className || "w-full h-full object-cover rounded-lg"}
        />

    );
};

export default CustomImage;
