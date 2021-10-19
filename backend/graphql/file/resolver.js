const File = require("../../models/file");
const { uploadToCloud, deleteFile } = require("../../helpers/uploadToCloud");

module.exports = {
    Query: {
        files: async (_, { docId }, req) => {
            const files = await File.find({ docId })
            return files
        }
    },
    Mutation: {
        uploadSingleFile: async (_, { file, docId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            // const gallery = await multiUpload(files, docId, userId)
            // return gallery
        },
        uploadFiles: async (_, { files, docId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            if (files) {
                console.log("2", files)
                files.map(async file => {
                    const newFile = await new File({
                        docId,
                        user: userId,
                        createdAt: new Date()
                    })
                    const upload = await uploadToCloud({ file, public_id: newFile._id });
                    newFile.url = upload.url
                    newFile.public_id = upload.public_id
                    await newFile.save()
                })
            }
            return await File.find({ docId })
        },
        deleteSingleFile: async (_, { public_id }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const isDeleted = await deleteFile(public_id)
            if (isDeleted) await File.deleteOne({ public_id })
            return true
        }

    }

}



