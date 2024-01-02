import { v2 } from "cloudinary";

/**
 * ! Configure Cloudinary with your credentials
 */

v2.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/** delete image from cloudinary */
export const deleteImageFromCloudinary = async (imageUrl) => {
    v2.config({
        cloud_name: process.env.CLOUDNAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        
    });
    try {
        const result = await v2.uploader.destroy(imageUrl);
        console.log(result);
    } catch (error) {
        console.log(error);
        throw Error("Image Deletion Failed!")
    }
}