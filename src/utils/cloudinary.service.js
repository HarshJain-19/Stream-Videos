import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    console.log("file uploaded on cloudinary:", uploadResponse.url);
    return uploadResponse;
  } catch (error) {
    console.error("file uploading failed:", error);
    return null;
  } finally {
    //* removing file from local which is temporary stored
    fs.unlinkSync(localFilePath);
  }
};

export { uploadOnCloudinary };

//^ can also do like this
/* 
const uploadResult = await cloudinary.uploader
  .upload(
    'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
    public_id: 'shoes',
  }
  )
  .catch((error) => {
    console.log(error);
  });

console.log(uploadResult);

// Optimize delivery by resizing and applying auto-format and auto-quality
const optimizeUrl = cloudinary.url('shoes', {
  fetch_format: 'auto',
  quality: 'auto'
});

console.log(optimizeUrl);
*/

