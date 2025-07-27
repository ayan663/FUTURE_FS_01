/*import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY ,
    api_secret : process.env.CLOUDINARY_API_SECRET_KEY
})

const uploadImageCloudinary = async(image) => {
    const buffer = image.Buffer || Buffer.from(await image.arrayBuffer())

    const uploadImage = await new Promise((resolve,reject) => {
        cloudinary.uploader.upload_stream({folder : "blinkMart"},(error,uploadResult) =>{
            return resolve(uploadResult)

        }).end(buffer)
    })

    return uploadImage
}

export default uploadImageCloudinary */

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

const uploadImageCloudinary = async (image) => {
    const buffer = image.buffer; // multer provides image as buffer

    const uploadImage = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "blinkMart" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        uploadStream.end(buffer);
    });

    return uploadImage;
};

export default uploadImageCloudinary;
