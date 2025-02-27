// import {v2 as cloudinary} from "cloudinary"
// import fs from "fs"

// cloudinary.config({ 
// cloudName:process.env.CLOUDINARY_CLOUD_NAME,
// API_key:process.env.CLOUDINARY_CLOUDINARY_API_KEY,
// API_seceret:process.env.CLOUDINARY__API_SECRET
// })

// const uploadOnCloudinary = async (localFilePath) =>{
//     try {
//         if(!localFilePath) return null
//         //upload the file on cloudinary
//        const response = await  cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         })
//         //filse has been uploaded sucessfully
//         console.log("file is uploaded on cloudnary",
//             response.url)
//         return response
        
//     } catch (error) {
//         //safe cleaning 
//         fs.unlinkSync(localFilePath) //remove the locally saved temp files as the upload opreation fails
//         return null
        
//     }
// }

//   export  {uploadOnCloudinary}


// //     // Upload an image
// //     const uploadResult = await cloudinary.uploader
// //     .upload(
// //         'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
// //             public_id: 'shoes',
// //         }
// //     )
// //     .catch((error) => {
// //         console.log(error);
// //     });
 
// //  console.log(uploadResult);import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// ✅ Correct Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Cloudinary Upload Function
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("✅ File uploaded to Cloudinary:", response.secure_url);

    // Return Cloudinary response
    return response;
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);

    // Safe cleanup: remove the local temp file if upload fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export { uploadOnCloudinary };
