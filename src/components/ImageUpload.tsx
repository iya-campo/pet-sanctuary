import { useState } from 'react';

export default function ImageUpload() {
  const [image, setImage] = useState(null);

  // Handle file change (upload)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // store the base64 image
      };
      reader.readAsDataURL(file); // read the image as a data URL
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {image && <img src={image} alt="Uploaded preview" width={200} />}
    </div>
  );
}