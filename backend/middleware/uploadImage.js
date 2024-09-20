import 'dotenv/config'
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary'


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

const imageProfile = new CloudinaryStorage({
cloudinary: cloudinary, 
params: {
  folder: 'profiles',
},
});

const imageEvent = new CloudinaryStorage({
    cloudinary: cloudinary, 
    params: {
      folder: 'events',
    },
    });

const uploadImageProfile = multer({ storage: imageProfile }); 
const uploadImageEvent = multer({ storage: imageEvent }); 

export {uploadImageProfile, uploadImageEvent};  




 


 