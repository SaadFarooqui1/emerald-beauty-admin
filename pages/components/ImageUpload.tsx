import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

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
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
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
    onChange,
    value
}) => {
    const [src, setSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const { t } = useTranslation();

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];

    //     if (!file) {
    //         setError('No file selected');
    //         return;
    //     }

    //     const fileSizeMB = file.size / (1024 * 1024);
    //     const maxSizeMB = parseFloat(maxFileSize);

    //     if (fileSizeMB > maxSizeMB) {
    //         setError(`File size exceeds ${maxFileSize}`);
    //         return;
    //     }

    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => setSrc(reader.result as string));
    //     reader.readAsDataURL(file);
    //     setError(null);
    // };

    const [fileType, setFileType] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    // Sync `value` prop with preview state
        useEffect(() => {
            if (value) {
                setPreview(value);
            }
        }, [value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            setError('No file selected');
            setFileType(null);
            setFileName(null);
            return;
        }

        const fileSizeMB = file.size / (1024 * 1024);
        const maxSizeMB = parseFloat(maxFileSize);

        if (fileSizeMB > maxSizeMB) {
            setError(`File size exceeds ${maxFileSize}`);
            setFileType(null);
            setFileName(null);
            return;
        }

        const filePreviewUrl = URL.createObjectURL(file);
        setError(null);
        setFileType(file.type); // Set file type (e.g., 'image/png', 'application/pdf')
        setFileName(file.name); // Set file name

        if (onChange) {
            onChange(e);
        }

        const reader = new FileReader();
        reader.addEventListener('load', () => setSrc(reader.result as string));
        reader.readAsDataURL(file);
        setError(null);
    };

    const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = e.currentTarget;
        setCrop({ unit: '%', width: 100, height: 100, x: 0, y: 0 });
    }, []);

    const getCroppedImg = useCallback((e: React.MouseEvent) => {
        e.preventDefault(); // Prevent page reload when clicking the button
        if (!completedCrop || !imgRef.current) return;

        const image = imgRef.current;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('No 2d context');
        }

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = completedCrop.width;
        canvas.height = completedCrop.height;

        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            completedCrop.width,
            completedCrop.height
        );

        canvas.toBlob((blob) => {
            if (!blob) {
                console.error('Canvas is empty');
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                setPreview(reader.result as string);
                setSrc(null);
            };
        });
    }, [completedCrop, setPreview]);

    return (
        <div>
            <label htmlFor={name} className="font-['Raleway'] rtl:font-medium rtl:font-['Tajawal'] text-lg font-semibold text-[#012d22] dark:text-white-light">
                {label}
            </label>
            <div
                className="mt-2 cursor-pointer rounded-lg border-2 border-dotted border-[#efe7eb] p-6 transition-colors duration-300 hover:bg-[#e0f7f7]"
                onClick={() => document.getElementById(name)?.click()}
            >
                <input id={name} name={name} type="file" accept={accept} className="hidden" onChange={handleFileChange} />
                <div className="text-center text-lg font-semibold rtl:font-medium rtl:font-['Tajawal']">
                    <p>
                        {t("Drop your files here or")}<span className="text-[#1bd9bf]"> {t("Browse")}</span>
                    </p>
                    <p className="mt-2 text-sm text-[#727272]">{t("Maximum size")} {maxFileSize}</p>
                </div>
            </div>
            {src && (
                <div className="mt-4">
                    <div className='flex flex-col gap-2'>
                        <h3 className="text-sm font-semibold rtl:font-medium rtl:font-['Tajawal'] mb-2">{t("Crop Image")}</h3>
                        <ReactCrop
                            crop={crop}
                            onChange={(c) => setCrop(c)}
                            onComplete={(c) => setCompletedCrop(c)}
                            // aspect={width / height}
                            minWidth={50} // Minimum crop width
                            minHeight={50} // Minimum crop height
                        >
                            <img ref={imgRef} src={src} onLoad={onImageLoad} alt="Crop me" />
                        </ReactCrop>
                        <div>
                            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 rtl:font-medium rtl:font-['Tajawal']" onClick={getCroppedImg}>
                                {t("Crop Image")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {preview && (
                <div className="mt-4">
                    <div className='flex items-center justify-between'>
                        <h3 className="text-sm font-semibold rtl:font-medium rtl:font-['Tajawal']">{t("Preview")}</h3>
                        <button
                            className='text-sm text-red-500 font-bold hover:underline rtl:font-medium rtl:font-["Tajawal"]'
                            onClick={() => setPreview(null)}
                        >
                            {t("Remove")}
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
