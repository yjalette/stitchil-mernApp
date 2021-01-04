const cloudinary = require('cloudinary');
require('dotenv').config()

const cloud_config = cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});


async function deleteFile(public_id) {
    await cloudinary.v2.uploader.destroy(public_id, (error) => error ? new Error("deleting file error", error) : true)

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

async function saveFile(item, file, userId) {
    console.log(item)
    const result = await uploadToCloud({ file, public_id: `${userId}/${item._id}` });
    try {
        item.imageUrl = result.url;
        item.save();
    } catch (error) {
        throw new Error(error)
    }

    return true;
}

exports.uploadToCloud = uploadToCloud;
exports.saveFile = saveFile;
exports.deleteFile = deleteFile;
exports.cloud_config = cloud_config;