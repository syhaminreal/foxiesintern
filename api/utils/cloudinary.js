import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload an image
export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // File has been uploaded
    console.log("File is uploaded on Cloudinary:", response.secure_url);
    return response;

  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.error("Cloudinary upload failed:", error.message);

    // Remove the locally saved temporary file if it exists
    // if (fs.existsSync(localFilePath)) {
    
  //  / }

    return null;
  }
};
