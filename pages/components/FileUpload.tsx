import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FileUploadProps {
    label: string;
    name: string;
    accept?: string;
    maxFileSize?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    value?: string;
    type?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
    label,
    name,
    value, // Fetched image URL
    accept = 'image/*',
    maxFileSize = '50 MB',
    onChange,
    disabled,
    onBlur,
    type
}) => {
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileType, setFileType] = useState<string | null>(type || null); // Initialize with type prop
    const [fileName, setFileName] = useState<string | null>(null);
    const { t } = useTranslation();

    // Sync value and type props with preview state
    useEffect(() => {
        if (value) {
            setPreview(value);
            setFileType(type || null); // Update file type based on the prop
        }
    }, [value, type]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            setError('No file selected');
            setPreview(null);
            setFileType(null);
            setFileName(null);
            return;
        }

        const fileSizeMB = file.size / (1024 * 1024);
        const maxSizeMB = parseFloat(maxFileSize);

        if (fileSizeMB > maxSizeMB) {
            setError(`File size exceeds ${maxFileSize}`);
            setPreview(null);
            setFileType(null);
            setFileName(null);
            return;
        }

        const filePreviewUrl = URL.createObjectURL(file);
        setError(null);
        setPreview(filePreviewUrl);
        setFileType(file.type); // Update file type dynamically
        setFileName(file.name);

        if (onChange) {
            onChange(e);
        }
    };

    const handleCancel = () => {
        setPreview(null);
        setError(null);
        const fileInput = document.getElementById(name) as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    
    return (
        <div>
            <label
                htmlFor={name}
                className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#012d22] dark:text-white-light"
            >
                {label}
            </label>
            <div
                className="border-2 border-dotted border-[#efe7eb] rounded-lg p-6 mt-2 cursor-pointer hover:bg-[#e0f7f7] transition-colors duration-300"
                onClick={() => document.getElementById(name)?.click()}
            >
                <input
                    id={name}
                    disabled={disabled}
                    name={name}
                    type="file"
                    accept={accept}
                    className="hidden"
                    onChange={handleFileChange}
                    onBlur={onBlur}
                />
                <div className="text-center font-semibold text-lg rtl:font-['Tajawal'] rtl:font-medium">
                    <p>{t("Drop your files here or")}<span className='text-[#1bd9bf]'> {t("Browse")}</span></p>
                    <p className="text-sm text-[#727272] mt-2">{t("Maximum size")} {maxFileSize}</p>
                </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {preview && !error && (
                <div className="mt-4 flex flex-col items-center">
                    {fileType === 'pdf' || fileType === 'application/pdf' ? (
                        // PDF preview
                        <object
                            data={preview}
                            type="application/pdf"
                            width="100%"
                            height="400px"
                            className="border rounded-lg shadow-md w-full max-w-lg"
                        >
                            <p>
                                Your browser does not support PDF preview.
                                <a href={preview} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                    Click here to download the file.
                                </a>
                            </p>
                        </object>
                    ) : <img
                        src={preview}
                        alt="Preview"
                        className="object-cover border rounded-lg shadow-md w-56"
                    />}
                    <button
                        onClick={handleCancel}
                        className="mt-2 px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors rtl:font-['Tajawal'] rtl:font-medium"
                    >
                        {t("Cancel")}
                    </button>
                </div>
            )}
        </div>
    );
};

export default FileUpload;