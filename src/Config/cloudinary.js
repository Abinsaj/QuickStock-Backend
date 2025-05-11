import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary

export const uploadToCloudinary = (fileBuffer, folder) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(fileBuffer);
    });
  };
  
  export const deleteFromCloudinary = async (imageUrl) => {
    try {
      const publicId = extractPublicId(imageUrl);
  
      if (!publicId) {
        throw new Error("Invalid image URL. Cannot extract public_id.");
      }
  
      const result = await cloudinary.uploader.destroy(publicId);
  
      if (result.result === "ok") {
        console.log("Image deleted successfully");
        return { success: true, message: "Image deleted successfully" };
      } else {
        console.warn("Image not found or already deleted:", result.result);
        return { success: false, message: "Image not found or already deleted" };
      }
    } catch (error) {
      console.error("Delete Image Error:", error);
      return {
        success: false,
        message: `Failed to delete image: ${error.message}`,
      };
    }
  };