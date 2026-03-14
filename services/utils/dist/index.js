"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudinary_js_1 = __importDefault(require("./routes/cloudinary.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5003;
const cloudinaryConfigs = {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_CLOUD_APIKEY: process.env.CLOUDINARY_CLOUD_APIKEY,
    CLOUDINARY_CLOUD_SECRET: process.env.CLOUDINARY_CLOUD_SECRET
};
// console.log(cloudinaryConfigs);
if (!cloudinaryConfigs.CLOUDINARY_CLOUD_APIKEY || !cloudinaryConfigs.CLOUDINARY_CLOUD_NAME || !cloudinaryConfigs.CLOUDINARY_CLOUD_SECRET) {
    throw new Error("Missing Cloudinary Configs");
}
cloudinary_1.default.v2.config({
    cloud_name: cloudinaryConfigs.CLOUDINARY_CLOUD_NAME,
    api_key: cloudinaryConfigs.CLOUDINARY_CLOUD_APIKEY,
    api_secret: cloudinaryConfigs.CLOUDINARY_CLOUD_SECRET
});
app.use("/api", cloudinary_js_1.default);
app.listen(PORT, () => {
    console.log("UTILs service running at ", PORT);
});
