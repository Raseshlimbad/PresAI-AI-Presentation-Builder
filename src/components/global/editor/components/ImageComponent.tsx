"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";

interface ImageComponentProps {
  src: string;
  alt: string;
  className?: string;
  isEditable?: boolean;
  isPreview?: boolean;
  contentId: string;
  onComponentChange: (componentId: string, newContent: string) => void;
}

const CustomImage = ({
  src,
  alt,
  className,
  isEditable,
  contentId,
  onComponentChange,
}: ImageComponentProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const params = useParams();
  const projectName = params.presentationId;

  // Cloudinary setup
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;

  // Default image URL
  const defaultImageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1742558363/nlgi63u4fnijpzm3slcm.jpg`;

  // Default or user-provided image
  const imageSrc = !src || src === "Image Placeholder" ? defaultImageUrl : src;

  // Handle image upload click
  const handleImageClick = () => {
    if (isEditable) fileInputRef.current?.click();
  };

  // Handle file upload
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setError("No file selected");
      return;
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      setError(`File too large. Max size is 10MB.`);
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    formData.append("folder", `projected/${projectName}`); // Upload in project-specific folder

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      // console.log("Cloudinary Response:", data);

      if (data.secure_url) {
        const uploadedImageUrl = data.secure_url;

        // Update parent component with the uploaded image URL
        onComponentChange(contentId, uploadedImageUrl);
      } else {
        console.error("Failed to upload image.");
      }
    } catch (error) {
      console.error(error);
      setError("Upload failed: Network error");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
    }
  };

  return (
    <div className="relative group w-full h-full rounded-lg">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleUpload}
        disabled={uploading}
      />

      {/* Image Display */}
      <div className="relative cursor-pointer" onClick={handleImageClick}>
      <Image
          src={imageSrc}
          alt={alt}
          width={800} // Specify width
          height={800} // Specify height
          className={`w-full h-full object-cover rounded-lg ${className}`}
        />
        {/* Loading Indicator */}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomImage;


