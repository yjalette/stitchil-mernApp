const File = require("../models/file");
const cloudinary = require('cloudinary');
require('dotenv').config()

const cloud_config = cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});


async function deleteSingleFile(imageUrl) {
    const file = await File.findOne({ imageUrl });
    await cloudinary.v2.uploader.destroy(file.public_id, async (error) => error ? new Error("deleting file error", error) : await file.deleteOne())
}

async function deleteFiles(files) {
    return files.forEach(file => deleteSingleFile(file))
}

async function uploadToCloud({ file, public_id }) {
    cloud_config;
    const { createReadStream } = await file;
    const uploadPromise = new Promise((resolve, reject) => {
        const readStream = createReadStream();
        var cloudStream = cloudinary.uploader.upload_stream(async function (result, error) {
            if (error) reject(error);
            const { public_id, secure_url } = result;
            if (!public_id || !secure_url) reject("file wasn't save to the cloud", error)
            resolve({ url: secure_url, public_id })

        }, { public_id: public_id.replace(/\s/g, '') });
        readStream.pipe(cloudStream)
    })
    return await uploadPromise;

}

async function saveFile(item, file, docId) {
    const result = await uploadToCloud({ file, public_id: `${docId}/${item._id}` });
    try {
        item.imageUrl = result.url;
        item.save();
    } catch (error) {
        throw new Error(error)
    }

    return true;
}

async function singleUpload(file, docId) {
    try {
        const upload = await uploadToCloud({ file, public_id: `${docId}/${Math.floor(Math.random() * 100) + 1}` })
        await new File({
            public_id: upload.public_id,
            imageUrl: upload.url,
            createdAt: new Date()
        }).save();
        return upload.url
    } catch (error) {
        throw new Error(error)
    }

}

async function multiUpload(files, userId) {
    return Promise.all(await files.map(async file => await singleUpload(file, userId)));

}
exports.multiUpload = multiUpload;
exports.uploadToCloud = uploadToCloud;
exports.singleUpload = singleUpload;
exports.saveFile = saveFile;
exports.deleteSingleFile = deleteSingleFile;
exports.deleteFiles = deleteFiles;
exports.cloud_config = cloud_config;