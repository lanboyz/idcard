
import React from 'react';

interface ImageUploadProps {
  label: string;
  id: string;
  onImageUpload: (base64: string) => void;
  uploadedImage: string | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, id, onImageUpload, uploadedImage }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {uploadedImage ? (
        <img src={uploadedImage} alt={`${label} preview`} className="w-16 h-16 rounded-md object-cover bg-gray-100" />
      ) : (
        <div className="w-16 h-16 rounded-md bg-gray-200 flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        </div>
      )}
      <div>
        <label htmlFor={id} className="cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-500">
          {label}
        </label>
        <input
          id={id}
          name={id}
          type="file"
          className="sr-only"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />
        <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
      </div>
    </div>
  );
};

export default ImageUpload;
