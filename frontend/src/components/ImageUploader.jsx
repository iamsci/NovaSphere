// components/ImageUploader.jsx

import { useState } from 'react';

export default function ImageUploader({ onUpload }) {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      onUpload(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={handleChange} />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-32 h-32 object-cover rounded border"
        />
      )}
    </div>
  );
}
