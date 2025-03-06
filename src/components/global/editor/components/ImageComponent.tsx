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


import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import UploadImage from './UploadImage';

interface ImageComponentProps {
    src: string;
    alt: string;
    className?: string;
    isPreview?: boolean;
    isEditable?: boolean;
    contentId: string;
    onComponentChange: (componentId: string, newContent: string) => void;
}

const CustomImage = ({ src, alt, className, isPreview, isEditable, contentId, onComponentChange }: ImageComponentProps) => {
    // Initialize Cloudinary
    const cld = new Cloudinary({ cloud: { cloudName: 'YOUR_CLOUD_NAME' } });

    // Create image object
    const img = cld
        .image(src)
        .format('auto')
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(800).height(800));

    return (
        <div className="relative group w-full h-full rounded-lg">
            {/* Cloudinary Image Display */}
            <AdvancedImage cldImg={img} className={`w-full h-full object-cover rounded-lg ${className}`} />

            {/* Upload Image (Only in Preview & Editable Mode) */}
            {isPreview && isEditable && (
                <div className="absolute top-0 left-0 hidden group-hover:block">
                    <UploadImage contentId={contentId} onComponentChange={onComponentChange} />
                </div>
            )}
        </div>
    );
};

export default CustomImage;

