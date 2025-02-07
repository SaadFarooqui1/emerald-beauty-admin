import React, { useState } from 'react';
import Resizer from 'react-image-file-resizer';

interface ImageUploadProps {
    label: string;
    name: string;
    accept?: string;
    maxFileSize?: string;
    width?: number;
    height?: number;
    preview: string | null;
    error: string | null;
    setPreview: (value: string | null) => void;
    setError: (value: string | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    label,
    name,
    accept = 'image/*',
    maxFileSize = '50 MB',
    preview,
    error,
    width = 500,
    height = 500,
    setPreview,
    setError,
}) => {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            setError('No file selected');
            return;
        }

        const fileSizeMB = file.size / (1024 * 1024);
        const maxSizeMB = parseFloat(maxFileSize);

        if (fileSizeMB > maxSizeMB) {
            setError(`File size exceeds ${maxFileSize}`);
            return;
        }

        // Resize the image
        Resizer.imageFileResizer(
            file,
            width, // Target width
            height, // Target height
            'JPEG', // Output format
            100, // Quality
            0, // Rotation
            (uri) => {
                setPreview(uri as string); // Set resized image as base64 string
                setError(null);
            },
            'base64' // Output type
        );
    };

    return (
        <div>
            <label htmlFor={name} className="font-['Raleway'] text-lg font-semibold text-[#012d22] dark:text-white-light">
                {label}
            </label>
            <div
                className="mt-2 cursor-pointer rounded-lg border-2 border-dotted border-[#efe7eb] p-6 transition-colors duration-300 hover:bg-[#e0f7f7]"
                onClick={() => document.getElementById(name)?.click()}
            >
                <input id={name} name={name} type="file" accept={accept} className="hidden" onChange={handleFileChange} />
                <div className="text-center text-lg font-semibold">
                    <p>
                        Drop your files here or<span className="text-[#1bd9bf]"> browse</span>
                    </p>
                    <p className="mt-2 text-sm text-[#727272]">Maximum size: {maxFileSize}</p>
                </div>
            </div>
            {preview && (
                <div className="mt-4">
                    <div className='flex items-center justify-between'>
                        <h3 className="text-sm font-semibold">Preview:</h3>
                        <button
                            className='text-sm text-red-500 font-bold hover:underline'
                            onClick={() => setPreview(null)}
                        >
                            Remove
                        </button>
                    </div>
                    
                    <img src={preview} alt="Preview" className="mt-2 rounded border border-gray-300 w-[12.5rem] h-auto" />
                </div>
            )}
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default ImageUpload;
