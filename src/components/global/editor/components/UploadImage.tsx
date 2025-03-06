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


'use client'

import React, { useState } from 'react';

interface UploadImageProps {
    contentId: string;
    onComponentChange: (componentId: string, newContent: string) => void;
}

const UploadImage = ({ contentId, onComponentChange }: UploadImageProps) => {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Replace with your Cloudinary upload preset

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (data.secure_url) {
                onComponentChange(contentId, data.secure_url);
            }
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input 
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                className="file-input"
            />
            {uploading && <p>Uploading...</p>}
        </div>
    );
};

export default UploadImage;
