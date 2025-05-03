"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploder = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
// Configuration
cloudinary_1.v2.config({
    cloud_name: 'ddzk2sd7f',
    api_key: '637516894516234',
    api_secret: 'bVBUYQdaFa3cPYzBVdY45VJovKo', // Click 'View API Keys' above to copy your API secret
});
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(process.cwd(), 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const uploadToCloudinary = (file) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(file.path, 
        // {public_id:file.originalname},
        (error, result) => {
            fs_1.default.unlinkSync(file.path);
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
});
// Upload an image
//  const uploadResult = await cloudinary.uploader
//    .upload(
//        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//            public_id: 'shoes',
//        }
//    )
//    .catch((error) => {
//        console.log(error);
//    });
// console.log(uploadResult);
// Optimize delivery by resizing and applying auto-format and auto-quality
// const optimizeUrl = cloudinary.url('shoes', {
//     fetch_format: 'auto',
//     quality: 'auto'
// });
// console.log(optimizeUrl);
// // Transform the image: auto-crop to square aspect_ratio
// const autoCropUrl = cloudinary.url('shoes', {
//     crop: 'auto',
//     gravity: 'auto',
//     width: 500,
//     height: 500,
// });
// console.log(autoCropUrl);
exports.fileUploder = {
    upload,
    uploadToCloudinary,
};
