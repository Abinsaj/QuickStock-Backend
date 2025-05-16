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
  
  const extractPublicId = (url) => {
    const parts = url.split("/");
  
    const versionIndex = parts.findIndex((part) => part.startsWith("v"));
    if (versionIndex === -1 || versionIndex + 1 >= parts.length) {
      throw new Error("Invalid Cloudinary URL. Cannot extract public_id.");
    }
    const publicIdWithExtension = parts.slice(versionIndex + 1).join("/");
  
    return publicIdWithExtension.split(".").slice(0, -1).join(".");
  };
  
  export const deleteFromCloudinary = async (imageUrl) => {
    try {
      const publicId = extractPublicId(imageUrl);
      if (!publicId) {
        throw new Error("Invalid image URL. Cannot extract public_id.");
      }
      const result = await cloudinary.uploader.destroy(publicId);
  
      if (result.result === "ok") {
        return { success: true, message: "Image deleted successfully" };
      } else {
        return { success: false, message: "Image not found or already deleted" };
      }
    } catch (error) {
      return {
        success: false,
        message: `Failed to delete image: ${error.message}`,
      };
    }
  };