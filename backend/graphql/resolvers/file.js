const File = require("../../models/file");
const User = require("../../models/user");
const { uploadToCloud, cloud_config, saveFile, deleteFile } = require("../../helpers/uploadToCloud");

module.exports = {
    Query: {
        files: async (_, { docId }, req) => {
            const files = await File.find({ docId });
            console.log("files--->", files)
            return files
        }
    },
    Mutation: {

        uploadFile: async (_, { captionInput, file, docId }, req) => {
            if (!req.isUser) throw new Error("unauthenticated");
            console.log("docid---->", docId)
            // const portfolio = await Portfolio.findOne({ creator: req.userId });
            const newFile = new File({ caption: captionInput, docId, creator: req.userId, createdAt: new Date() });
            const upload = await uploadToCloud({ file, public_id: `${req.userId}/${newFile._id}` });
            newFile.imageUrl = upload.url;
            await newFile.save();
            return newFile.imageUrl
        },
        updateFile: async (_, { captionInput, file, itemId }, req) => {
            console.log("cap", captionInput, itemId)
            if (!req.isUser) throw new Error("unauthenticated");
            if (file) {
                try {
                    saveFile(await File.findById(itemId), file, req.userId);
                } catch (error) {
                    throw new Error(error)
                }
            }
            else await File.updateOne({ _id: itemId }, { $set: { caption: captionInput } })

        },

        deleteFile: async (_, { itemId }, req) => {
            if (!req.isUser) throw new Error("unauthenticated user to delete this file");
            await deleteFile(`${req.userId}/${itemId}`);
            await File.findByIdAndDelete(itemId);
            return true
        },
        deleteProfileImage: async (_, { image_type }, req) => {
            if (!req.isUser) throw new Error("unauthenticated user to delete this file");
            cloud_config;
            const user = await User.findById(req.userId);
            await deleteFile(`${req.userId}/${image_type}`);
            user[image_type] = null;
            return await user.save();
        }
    }


}



