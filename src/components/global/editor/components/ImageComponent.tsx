// Using Upload care with limited time free account access
// https://uploadcare.com/

// import Image from 'next/image'
// import React from 'react'
// import UploadImage from './UploadImage'

// interface ImageComponentProps {
//     src: string
//     alt: string
//     className?: string
//     isPreview?: boolean
//     isEditable?: boolean
//     contentId: string
//     onComponentChange: (
//         componentId: string,
//         newContent: string | string[] | string[][]
//     ) => void
// }

// const CustomImage = ({
//     src,
//     alt,
//     className,
//     isPreview,
//     isEditable,
//     contentId,
//     onComponentChange
// }: ImageComponentProps) => {
//   return (
//     <div className={`relative group w-full h-full rounded-lg`}>
//         {/* Image */}
//       <Image
//       src={src}
//     //   Test src
//     //   src={"https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYdlfHx8fGVufDB8fHx8fA%3D%3D"}
//       alt={alt}
//       width={isPreview ? 48 : 800}
//       height={isPreview ? 48 : 800}
//       className={`w-full h-full object-cover rounded-lg ${className}`}
//       />
//       {/* Upload Image  if preview and editable */}
//       {isPreview && isEditable && (
//         <div className="absolute top-0 left-0 hidden group-hover:block">
//             {/* Upload Image Component */}
//             <UploadImage
//                 contentId={contentId}
//                 onComponentChange={onComponentChange}
//             />
//         </div>
//       )}
//     </div>
//   )
// }

// export default CustomImage

// Using Cloudinary as an alternative to Uploadcare
// https://cloudinary.com/

// import React from 'react';
// import { Cloudinary } from '@cloudinary/url-gen';
// import { auto } from '@cloudinary/url-gen/actions/resize';
// import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
// import { AdvancedImage } from '@cloudinary/react';
// import UploadImage from './UploadImage';

// interface ImageComponentProps {
//     src: string;
//     alt: string;
//     className?: string;
//     isPreview?: boolean;
//     isEditable?: boolean;
//     contentId: string;
//     onComponentChange: (componentId: string, newContent: string) => void;
// }

// const CustomImage = ({ src, alt, className, isPreview, isEditable, contentId, onComponentChange }: ImageComponentProps) => {
//     // Initialize Cloudinary
//     const cld = new Cloudinary({ cloud: { cloudName: `${process.env.CLOUDINARY_CLOUD_NAME!}` } });

//     // Create image object
//     const img = cld
//         .image(src)
//         .format('auto')
//         .quality('auto')
//         .resize(auto().gravity(autoGravity()).width(800).height(800));

//     return (
//         <div className="relative group w-full h-full rounded-lg">
//             {/* Cloudinary Image Display */}
//             <AdvancedImage cldImg={img} className={`w-full h-full object-cover rounded-lg ${className}`} />

//             {/* Upload Image (Only in Preview & Editable Mode) */}
//             {isPreview && isEditable && (
//                 <div className="absolute top-0 left-0 hidden group-hover:block">
//                     <UploadImage contentId={contentId} onComponentChange={onComponentChange} />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CustomImage;

// Test run 1 #######################################################################################################

// CustomImage.tsx
// import React from 'react';
// import { Cloudinary } from '@cloudinary/url-gen';
// import { auto } from '@cloudinary/url-gen/actions/resize';
// import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
// import { AdvancedImage } from '@cloudinary/react';
// import UploadImage from './UploadImage';

// interface ImageComponentProps {
//   src: string;
//   alt: string;
//   className?: string;
//   isPreview?: boolean;
//   isEditable?: boolean;
//   contentId: string;
//   onComponentChange: (componentId: string, newContent: string) => void;
// }

// const CustomImage = ({
//   src,
//   alt,
//   className,
//   isPreview,
//   isEditable,
//   contentId,
//   onComponentChange,
// }: ImageComponentProps) => {
//   // Initialize Cloudinary
// //   const cld = new Cloudinary({ cloud: { cloudName: "dpdb2wcfi" } });
// //   const cld = new Cloudinary({ cloud: { cloudName: `${process.env.CLOUDINARY_CLOUD_NAME!}`} });
// const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
// const cld = new Cloudinary({ cloud: { cloudName } });
// // console.log('Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

//   // Default image URL
//   const defaultImageUrl =
//     // 'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYdlfHx8fGVufDB8fHx8fA%3D%3D';
//     `https://res.cloudinary.com/${cloudName}/image/upload/v1742558363/nlgi63u4fnijpzm3slcm.jpg`;

//   // Use default image if src is empty, a placeholder, or invalid
//   const imageSrc = !src || src === 'Image Placeholder' ? defaultImageUrl : src;

//   // Create image object with Cloudinary transformations
//   const img = cld
//     .image(imageSrc.includes('cloudinary') ? imageSrc.split('/').pop() : imageSrc) // Extract public ID if Cloudinary URL
//     .format('auto')
//     .quality('auto')
//     .resize(auto().gravity(autoGravity()).width(800).height(800));
//     // .resize(auto().gravity(autoGravity()).width(200).height(200));

//   return (
//     <div className="relative group w-full h-full rounded-lg">
//       {/* Cloudinary Image Display */}
//       <AdvancedImage
//         cldImg={img}
//         className={`w-full h-full object-cover rounded-lg ${className}`}
//         alt={alt}
//       />

//       {/* Upload Button (Visible in Editable & Preview Mode) */}
//       <p className='text-white'>{isEditable}</p>
//       {isEditable && isPreview && (
//         <div className="absolute top-2 right-2 hidden group-hover:block">
//           <UploadImage contentId={contentId} onComponentChange={onComponentChange} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomImage;

// Test run 1 - Without UploadImage component #######################################################################################################

// 'use client';

// import React, { useState, useRef } from 'react';
// import { Cloudinary } from '@cloudinary/url-gen';
// import { auto } from '@cloudinary/url-gen/actions/resize';
// import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
// import { AdvancedImage } from '@cloudinary/react';

// interface ImageComponentProps {
//   src: string;
//   alt: string;
//   className?: string;
//   isPreview?: boolean;
//   isEditable?: boolean;
//   contentId: string;
//   onComponentChange: (componentId: string, newContent: string) => void;
// }

// const CustomImage = ({
//   src,
//   alt,
//   className,
//   isPreview = true,
//   isEditable = true,
//   contentId,
//   onComponentChange,
// }: ImageComponentProps) => {
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Cloudinary setup
//   const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
//   const cld = new Cloudinary({ cloud: { cloudName } });

//   // Default image URL
//   const defaultImageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1742558363/nlgi63u4fnijpzm3slcm.jpg`;

//   // Use default image if src is empty, a placeholder, or invalid
//   const imageSrc = !src || src === 'Image Placeholder' ? defaultImageUrl : src;

//   // Create Cloudinary image with transformations
//   const img = cld
//     .image(imageSrc.includes('cloudinary') ? imageSrc.split('/').pop() : imageSrc)
//     .format('auto')
//     .quality('auto')
//     .resize(auto().gravity(autoGravity()).width(800).height(800));

//   // Handle file input click
//   const handleImageClick = () => {
//     if (isEditable && isPreview) {
//       fileInputRef.current?.click();
//     }
//   };

//   // Handle image upload
//   const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) {
//       setError('No file selected');
//       return;
//     }

//     setUploading(true);
//     setError(null);

//     // Create form data for upload
//     const formData = new FormData();
//     formData.append('file', file);
//     const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'PresAI-AI_Presentation_Builder';
//     formData.append('upload_preset', uploadPreset);

//     try {
//       // Upload image to Cloudinary
//       const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();
//       if (data.secure_url) {
//         onComponentChange(contentId, data.secure_url);
//       } else {
//         setError('Upload failed: ' + (data.error?.message || 'Unknown error'));
//       }
//     } catch (error) {
//       setError('Upload failed: Network error');
//     } finally {
//       setUploading(false);
//       if (fileInputRef.current) fileInputRef.current.value = ''; // Reset file input
//     }
//   };

//   return (
//     <div className="relative group w-full h-full rounded-lg">
//       {/* Hidden File Input */}
//       <input
//         type="file"
//         accept="image/*"
//         className="hidden"
//         ref={fileInputRef}
//         onChange={handleUpload}
//         disabled={uploading}
//       />

//       {/* Cloudinary Image Display */}
//       <div className="relative cursor-pointer" onClick={handleImageClick}>
//         <AdvancedImage cldImg={img} className={`w-full h-full object-cover rounded-lg ${className}`} alt={alt} />

//         {/* Loading Indicator */}
//         {uploading && (
//           <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
//             <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//               />
//             </svg>
//           </div>
//         )}
//       </div>

//       {/* Error Message */}
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// };

// export default CustomImage;

// Test run 1 - Without UploadImage component #######################################################################################################

// 'use client';

// import React, { useState, useRef } from 'react';
// import { Cloudinary } from '@cloudinary/url-gen';
// import { auto } from '@cloudinary/url-gen/actions/resize';
// import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
// import { AdvancedImage } from '@cloudinary/react';

// interface ImageComponentProps {
//   src: string;
//   alt: string;
//   className?: string;
//   isPreview?: boolean;
//   isEditable?: boolean;
//   contentId: string;
//   onComponentChange: (componentId: string, newContent: string) => void;
// }

// const CustomImage = ({
//   src,
//   alt,
//   className,
//   isPreview,
//   isEditable,
//   contentId,
//   onComponentChange,
// }: ImageComponentProps) => {
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Debugging Logs
//   console.log('isEditable:', isEditable);
//   console.log('isPreview:', isPreview);

//   // Cloudinary setup
//   const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
//   const cld = new Cloudinary({ cloud: { cloudName } });

//   // Default image URL
//   const defaultImageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1742558363/nlgi63u4fnijpzm3slcm.jpg`;

//   // Use default image if src is empty, a placeholder, or invalid
//   const imageSrc = !src || src === 'Image Placeholder' ? defaultImageUrl : src;

//   const extractPublicId = (url: string): string => {
//     // Remove Cloudinary base URL
//     const parts = url.split('/');
//     const filename = parts[parts.length - 1]; // Get last part (e.g., "abc123.jpg")

//     // Remove file extension
//     return filename.split('.')[0]; // Extract "abc123" from "abc123.jpg"
//   };

//   // Create Cloudinary image with transformations
//   // const   img = cld
//   //   .image(imageSrc.includes('cloudinary') ? imageSrc.split('/').pop() : imageSrc)
//   //   .format('auto')
//   //   .quality('auto')
//   //   .resize(auto().gravity(autoGravity()).width(800).height(800));

//   const [cloudinaryImg, setCloudinaryImg] = useState(() =>
//     cld.image(extractPublicId(imageSrc))
//       .format('auto')
//       .quality('auto')
//       .resize(auto().gravity(autoGravity()).width(800).height(800))
//   );

//   // Handle file input click
//   const handleImageClick = () => {
//     console.log('Image clicked!'); // Debugging
//     console.log('isEditable:', isEditable);
//     console.log('isPreview:', isPreview);
//     console.log('File input ref:', fileInputRef.current);

//     // Allow upload if the component is editable, even if isPreview is false
//     if (isEditable) {
//       console.log('Triggering file input...');
//       fileInputRef.current?.click();
//     } else {
//       console.warn('Upload is disabled. Ensure isEditable is true.');
//     }
//   };

//   // Handle image upload
//   // const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//   //   const file = event.target.files?.[0];
//   //   if (!file) {
//   //     setError('No file selected');
//   //     return;
//   //   }

//   //   setUploading(true);
//   //   setError(null);

//   //   // Create form data for upload
//   //   const formData = new FormData();
//   //   formData.append('file', file);
//   //   const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'PresAI-AI_Presentation_Builder';
//   //   formData.append('upload_preset', uploadPreset);

//   //   try {
//   //     // Upload image to Cloudinary
//   //     const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//   //       method: 'POST',
//   //       body: formData,
//   //     });

//   //     const data = await res.json();
//   //     if (data.secure_url) {
//   //       console.log('Upload successful! New Image URL:', data.secure_url);
//   //       onComponentChange(contentId, data.secure_url);
//   //     } else {
//   //       console.error('Upload failed:', data);
//   //       setError('Upload failed: ' + (data.error?.message || 'Unknown error'));
//   //     }
//   //   } catch (error) {
//   //     console.error('Network error during upload:', error);
//   //     setError('Upload failed: Network error');
//   //   } finally {
//   //     setUploading(false);
//   //     if (fileInputRef.current) fileInputRef.current.value = ''; // Reset file input
//   //   }
//   // };

//   const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) {
//       setError('No file selected');
//       return;
//     }

//     // Enforce max file size before upload (10MB)
//     const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
//     if (file.size > MAX_FILE_SIZE) {
//       setError(`File too large. Got ${file.size}, max is ${MAX_FILE_SIZE}`);
//       return;
//     }

//     setUploading(true);
//     setError(null);

//     // Create form data for Cloudinary
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

//     try {
//       const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;

//       // Upload Image
//       const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();
//       console.log("Cloudinary Response:", data); // ✅ Check response here
//       if (data.secure_url) {
//         // console.log('Upload successful, URL:', data.secure_url);

//         // // Apply transformations: Convert to AVIF & Compress
//         // // const transformedUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_avif,q_auto,w_800,h_800/${data.public_id}`;
//         // const transformedUrl = `https://res.cloudinary.com/dpdb2wcfi/image/upload/f_auto,q_auto,c_auto,g_auto,h_800,w_800/v${data.version}/${data.public_id}.${data.format}`;
//         // console.log("transformed url: " + transformedUrl);

//         // onComponentChange(contentId, transformedUrl);

//         if (data.secure_url) {
//           console.log('Upload successful, URL:', data.secure_url);

//           // Extract new public_id
//           const newPublicId = extractPublicId(data.secure_url);

//           // Update Cloudinary Image state
//           setCloudinaryImg(
//             cld.image(newPublicId)
//               .format('auto')
//               .quality('auto')
//               .resize(auto().gravity(autoGravity()).width(800).height(800))
//           );

//           // Update parent component with new URL
//           onComponentChange(contentId, data.secure_url);
//         }
//       } else {
//         setError('Upload failed: ' + (data.error?.message || 'Unknown error'));
//       }
//     } catch (error) {
//       setError('Upload failed: Network error');
//     } finally {
//       setUploading(false);
//       if (fileInputRef.current) fileInputRef.current.value = ''; // Reset file input
//     }
//   };

//   console.log("Cloudnary Image url: " + cloudinaryImg);

//   return (
//     <div className="relative group w-full h-full rounded-lg">
//       {/* Hidden File Input */}
//       <input
//         type="file"
//         accept="image/*"
//         className="hidden"
//         ref={fileInputRef}
//         onChange={handleUpload}
//         disabled={uploading}
//       />

//       {/* Cloudinary Image Display */}
//       <div className="relative cursor-pointer" onClick={handleImageClick}>
//         <AdvancedImage cldImg={cloudinaryImg} className={`w-full h-full object-cover rounded-lg ${className}`} alt={alt} />

//         {/* Loading Indicator */}
//         {uploading && (
//           <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
//             <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//               />
//             </svg>
//           </div>
//         )}
//       </div>

//       {/* Error Message */}
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// };

// export default CustomImage;

// Test run 2 - Without UploadImage component : Upload functionality works and displays bur database url store issue #######################################################################################################

// "use client";

// import React, { useState, useRef } from "react";
// import { Cloudinary } from "@cloudinary/url-gen";
// import { auto } from "@cloudinary/url-gen/actions/resize";
// import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
// import { AdvancedImage } from "@cloudinary/react";

// interface ImageComponentProps {
//   src: string;
//   alt: string;
//   className?: string;
//   isPreview?: boolean;
//   isEditable?: boolean;
//   contentId: string;
//   onComponentChange: (componentId: string, newContent: string) => void;
// }

// const CustomImage = ({
//   src,
//   alt,
//   className,
//   isPreview,
//   isEditable,
//   contentId,
//   onComponentChange,
// }: ImageComponentProps) => {
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Debugging Logs
//   console.log("isEditable:", isEditable);
//   console.log("isPreview:", isPreview);

//   // Cloudinary setup
//   const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
//   const cld = new Cloudinary({ cloud: { cloudName } });

//   // Default image URL
//   const defaultImageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1742558363/nlgi63u4fnijpzm3slcm.jpg`;

//   // Use default image if src is empty, a placeholder, or invalid
//   const imageSrc = !src || src === "Image Placeholder" ? defaultImageUrl : src;

//   const extractPublicId = (url: string): string => {
//     const match = url.match(/\/upload\/(?:v\d+\/)?([^/.]+)/);
//     return match ? match[1] : "";
//   };


//   const [cloudinaryImg, setCloudinaryImg] = useState(() =>
//     cld
//       .image(extractPublicId(imageSrc))
//       .format("auto")
//       .quality("auto")
//       .resize(auto().gravity(autoGravity()).width(800).height(800))
//   );

//   // Handle file input click
//   const handleImageClick = () => {
//     console.log("Image clicked!"); // Debugging
//     console.log("isEditable:", isEditable);
//     console.log("isPreview:", isPreview);
//     console.log("File input ref:", fileInputRef.current);

//     // Allow upload if the component is editable, even if isPreview is false
//     if (isEditable) {
//       console.log("Triggering file input...");
//       fileInputRef.current?.click();
//     } else {
//       console.warn("Upload is disabled. Ensure isEditable is true.");
//     }
//   };


//   const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) {
//       setError("No file selected");
//       return;
//     }

//     // Enforce max file size before upload (10MB)
//     const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
//     if (file.size > MAX_FILE_SIZE) {
//       setError(`File too large. Got ${file.size}, max is ${MAX_FILE_SIZE}`);
//       return;
//     }

//     setUploading(true);
//     setError(null);

//     // Create form data for Cloudinary
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append(
//       "upload_preset",
//       process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
//     );

//     try {
//       const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;

//       // Upload Image
//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await res.json();
//       console.log("Cloudinary Response:", data); // ✅ Check response here

//       if (data.secure_url) {
//         console.log('Upload successful, URL:', data.secure_url);
      
//         // Extract new public_id
//         const newPublicId = extractPublicId(data.secure_url);
//         console.log("Extracted Public ID:", newPublicId); // ✅ Debugging step
      
//         if (newPublicId) {
//           // Update Cloudinary Image state with the correct transformation
//           const updatedImage = cld.image(newPublicId)
//             .format('auto')
//             .quality('auto')
//             .resize(auto().gravity(autoGravity()).width(800).height(800));
      
//           setCloudinaryImg(updatedImage);
//         } else {
//           console.error("Failed to extract Public ID from:", data.secure_url);
//         }
      
//         // Update parent component with new URL
//         console.log("url to be uploaded to database: ",data.secure_url)
//         onComponentChange(contentId, data.secure_url);
//       }
      
//     } catch (error) {
//       setError("Upload failed: Network error");
//     } finally {
//       setUploading(false);
//       if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
//     }
//   };

//   console.log("Cloudnary Image url: " + cloudinaryImg);

//   return (
//     <div className="relative group w-full h-full rounded-lg">
//       {/* Hidden File Input */}
//       <input
//         type="file"
//         accept="image/*"
//         className="hidden"
//         ref={fileInputRef}
//         onChange={handleUpload}
//         disabled={uploading}
//       />

//       {/* Cloudinary Image Display */}
//       <div className="relative cursor-pointer" onClick={handleImageClick}>
//         <AdvancedImage
//           cldImg={cloudinaryImg}
//           className={`w-full h-full object-cover rounded-lg ${className}`}
//           alt={alt}
//         />

//         {/* Loading Indicator */}
//         {uploading && (
//           <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
//             <svg
//               className="animate-spin h-6 w-6 text-white"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//               />
//             </svg>
//           </div>
//         )}
//       </div>

//       {/* Error Message */}
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// };

// export default CustomImage;


// Test run 3 - Without UploadImage component : Upload functionality works and displays bur database url store issue #######################################################################################################

// "use client";

// import React, { useState, useRef } from "react";
// import { Cloudinary } from "@cloudinary/url-gen";
// import { auto } from "@cloudinary/url-gen/actions/resize";
// import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
// import { AdvancedImage } from "@cloudinary/react";

// interface ImageComponentProps {
//   src: string;
//   alt: string;
//   className?: string;
//   isEditable?: boolean;
//   isPreview?: boolean;
//   contentId: string;
//   onComponentChange: (componentId: string, newContent: string) => void;
// }

// const CustomImage = ({
//   src,
//   alt,
//   className,
//   isEditable,
//   isPreview,
//   contentId,
//   onComponentChange,
// }: ImageComponentProps) => {
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Cloudinary setup
//   const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
//   const cld = new Cloudinary({ cloud: { cloudName } });

//   // Default image URL
//   const defaultImageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1742558363/nlgi63u4fnijpzm3slcm.jpg`;

//   // Extract the public_id from a given Cloudinary URL
//   const extractPublicId = (url: string): string => {
//     const match = url.match(/\/upload\/(?:v\d+\/)?([^/.]+)/);
//     return match ? match[1] : "";
//   };

//   // Generate transformed Cloudinary URL
//   const generateCloudinaryUrl = (publicId: string) => {
//     return `https://res.cloudinary.com/${cloudName}/image/upload/f_webp,fl_awebp/q_auto/c_auto,g_auto,h_800,w_800/v${Date.now()}/${publicId}`;
//   };

//   // Default or user-provided image
//   const imageSrc = !src || src === "Image Placeholder" ? defaultImageUrl : src;
//   const initialPublicId = extractPublicId(imageSrc);
  
//   const [cloudinaryImg, setCloudinaryImg] = useState(() =>
//     cld.image(initialPublicId)
//       .format("auto")
//       .quality("auto")
//       .resize(auto().gravity(autoGravity()).width(800).height(800))
//   );

//   // Handle image upload click
//   const handleImageClick = () => {
//     if (isEditable) fileInputRef.current?.click();
//   };

//   // Handle file upload
//   const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) {
//       setError("No file selected");
//       return;
//     }

//     const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
//     if (file.size > MAX_FILE_SIZE) {
//       setError(`File too large. Max size is 10MB.`);
//       return;
//     }

//     setUploading(true);
//     setError(null);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
//     formData.append("folder", `projected/${contentId}`); // Upload in project-specific folder

//     try {
//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//         { method: "POST", body: formData }
//       );

//       const data = await res.json();
//       console.log("Cloudinary Response:", data);

//       if (data.secure_url) {
//         const newPublicId = data.public_id;
//         console.log("Extracted Public ID:", newPublicId);

//         if (newPublicId) {
//           // Construct transformed URL
//           const transformedUrl = generateCloudinaryUrl(newPublicId);
//           console.log("Transformed URL:", transformedUrl);

//           // Update Cloudinary Image state
//           setCloudinaryImg(
//             cld.image(newPublicId)
//               .format("auto")
//               .quality("auto")
//               .resize(auto().gravity(autoGravity()).width(800).height(800))
//           );

//           console.log("secure_url: ", data.secure_url)
//           // Update parent component with transformed URL
//           // onComponentChange(contentId, transformedUrl.toString());
//           onComponentChange(contentId, data.secure_url);
//         } else {
//           console.error("Failed to extract Public ID.");
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       setError("Upload failed: Network error");
//     } finally {
//       setUploading(false);
//       if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
//     }
//   };

//   return (
//     <div className="relative group w-full h-full rounded-lg">
//       {/* Hidden File Input */}
//       <input
//         type="file"
//         accept="image/*"
//         className="hidden"
//         ref={fileInputRef}
//         onChange={handleUpload}
//         disabled={uploading}
//       />

//       {/* Cloudinary Image Display */}
//       <div className="relative cursor-pointer" onClick={handleImageClick}>
//         <AdvancedImage
//           cldImg={cloudinaryImg}
//           className={`w-full h-full object-cover rounded-lg ${className}`}
//           alt={alt}
//         />

//         {/* Loading Indicator */}
//         {uploading && (
//           <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
//             <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//               />
//             </svg>
//           </div>
//         )}
//       </div>

//       {/* Error Message */}
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// };

// export default CustomImage;



"use client";
import React, { useState, useRef } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import Image from "next/image";
import { useParams } from "next/navigation";

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
  isPreview,
  contentId,
  onComponentChange,
}: ImageComponentProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const params = useParams();
  const projectName = params.presentationId;
  console.log("parans:" , params.presentationId)

  // Cloudinary setup
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  // const cld = new Cloudinary({ cloud: { cloudName } });

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
      console.log("Cloudinary Response:", data);

      if (data.secure_url) {
        const uploadedImageUrl = data.secure_url;
        console.log("Uploaded Image URL:", uploadedImageUrl);

        // Update parent component with the uploaded image URL
        onComponentChange(contentId, uploadedImageUrl);
      } else {
        console.error("Failed to upload image.");
      }
    } catch (error) {
      console.log(error);
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


