// Using Upload care with limited time free account access
// https://uploadcare.com/
// 'use client'

// import React from 'react'
// // Uploadcare
// import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
// import '@uploadcare/react-uploader/core.css';

// interface UploadImageProps {
//     contentId: string
//     onComponentChange: (
//         componentId: string,
//         newContent: string | string[] | string[][]
//     ) => void
// }

// const UploadImage = ({
//     contentId,
//     onComponentChange
// }: UploadImageProps) => {

//     // Handle change event
//     const handleChangeEvent = (e:{cdnUrl: string | string[] | string[][]}) => {
//         onComponentChange(contentId,e.cdnUrl)
//     }

//   return (
//     <div>
//         {/* Upload Image Component */}
//     <FileUploaderRegular
//        sourceList="local, url, fropnox"
//        classNameUploader="uc-light"
//        pubkey= {process.env.UPLOADCORE_PUBLIC_KEY!}
//        multiple={false}
//        onFileUploadSuccess={handleChangeEvent}
//        maxLocalFileSizeBytes = {10000000}
//     />
//   </div>
//   )
// }

// export default UploadImage






// Using Cloudinary as an alternative to Uploadcare
// https://cloudinary.com/


// 'use client'

// import React, { useState } from 'react';

// interface UploadImageProps {
//     contentId: string;
//     onComponentChange: (componentId: string, newContent: string) => void;
// }

// const UploadImage = ({ contentId, onComponentChange }: UploadImageProps) => {
//     // State to handle uploading
//     const [uploading, setUploading] = useState(false);

//     // Handle upload event
//     const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (!file) return;

//         setUploading(true);

//         // Create form data
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET!); // Replace with your Cloudinary upload preset

//         try {
//             // Upload image to Cloudinary
//             const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME!}/image/upload`, {
//                 method: 'POST',
//                 body: formData,
//             });

//             // Get response data
//             const data = await res.json();
//             if (data.secure_url) {
//                 // Update component with new image URL
//                 onComponentChange(contentId, data.secure_url);
//             }
//         } catch (error) {
//             console.error('Upload failed:', error);
//         } finally {
//             // Reset uploading state
//             setUploading(false);
//         }
//     };

//     return (
//         <div>
//             {/* Upload Image Input */}
//             <input 
//                 type="file"
//                 accept="image/*"
//                 onChange={handleUpload}
//                 disabled={uploading}
//                 className="file-input"
//             />
//             {/* Uploading state */}
//             {uploading && <p>Uploading...</p>}
//         </div>
//     );
// };

// export default UploadImage;

// Test run 1 #######################################################################################################

// UploadImage.tsx
// 'use client';

// import React, { useState, useRef } from 'react';
// import { Button } from '@/components/ui/button'; // Assuming you have a Button component

// interface UploadImageProps {
//   contentId: string;
//   onComponentChange: (componentId: string, newContent: string) => void;
// }

// const UploadImage = ({ contentId, onComponentChange }: UploadImageProps) => {
//   const [uploading, setUploading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Trigger file input click
//   const handleButtonClick = () => {
//     fileInputRef.current?.click();
//   };

//   // Handle upload event
//   const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     setUploading(true);

//     // Create form data
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!); // Ensure this is set in your .env

//     try {
//       // Upload image to Cloudinary
//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/image/upload`,
//         {
//           method: 'POST',
//           body: formData,
//         }
//       );

//       // Get response data
//       const data = await res.json();
//       if (data.secure_url) {
//         // Update component with new image URL
//         onComponentChange(contentId, data.secure_url);
//       }
//     } catch (error) {
//       console.error('Upload failed:', error);
//     } finally {
//       // Reset uploading state
//       setUploading(false);
//       // Reset file input to allow re-uploading the same file
//       if (fileInputRef.current) fileInputRef.current.value = '';
//     }
//   };

//   return (
//     <div>
//       {/* Hidden File Input */}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleUpload}
//         disabled={uploading}
//         className="hidden"
//         ref={fileInputRef}
//       />
//       {/* Upload Button */}
//       <Button
//         onClick={handleButtonClick}
//         disabled={uploading}
//         variant="secondary"
//         size="sm"
//       >
//         {uploading ? 'Uploading...' : 'Upload Image'}
//       </Button>
//     </div>
//   );
// };

// export default UploadImage;


// UploadImage.tsx
'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component

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
    console.log('Upload button clicked'); // Debug
    setError(null); // Reset error state
    fileInputRef.current?.click();
  };

  // Handle upload event
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setError('No file selected');
      console.log('No file selected'); // Debug
      return;
    }

    setUploading(true);
    setError(null);

    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "PresAI-AI_Presentation_Builder";
    formData.append('upload_preset', uploadPreset);
    console.log('Uploading with preset:', uploadPreset); // Debug

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
        console.log('Upload successful, URL:', data.secure_url); // Debug
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