'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface UploadImageProps {
  contentId: string;
  onComponentChange: (componentId: string, newContent: string) => void;
}

const UploadImage = ({ contentId, onComponentChange }: UploadImageProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger file input click
  const handleButtonClick = () => {
    setError(null); // Reset error state
    fileInputRef.current?.click();
  };

  // Handle upload event
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setError('No file selected');
      return;
    }

    setUploading(true);
    setError(null);

    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "PresAI-AI_Presentation_Builder";
    formData.append('upload_preset', uploadPreset);

    try {
      // Upload image to Cloudinary
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dpdb2wcfi';
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      // Get response data
      const data = await res.json();
      if (data.secure_url) {
        onComponentChange(contentId, data.secure_url);
      } else {
        console.error('Upload failed, response:', data); // Debug
        setError('Upload failed: ' + (data.error?.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setError('Upload failed: Network error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = ''; // Reset file input
    }
  };

  return (
    <div className="flex flex-col items-start">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="hidden"
        ref={fileInputRef}
      />
      {/* Upload Button */}
      <Button
        onClick={handleButtonClick}
        disabled={uploading}
        variant="secondary"
        size="sm"
        className="flex items-center gap-2"
      >
        {uploading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
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
            Uploading...
          </>
        ) : (
          'Upload Image'
        )}
      </Button>
      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default UploadImage;