import { v2 as cloudinary } from 'cloudinary';
import config from '../config/config';

cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

console.log("config cloudinary", config.cloudinary)

export const uploadImageCloudinary = async (filepath: string) => {
    return await cloudinary.uploader.upload(filepath, { folder: 'movies' });
  };


export const deleteImageCloudinary = async (publicId: string) => {
    return await cloudinary.uploader.destroy(publicId);
  };
  