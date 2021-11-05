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
                return files.map(async (file, index) => {
                    const newFile = await new File({
                        docId,
                        user: userId,
                        order: index,
                        createdAt: new Date()
                    })
                    const upload = await uploadToCloud({ file, public_id: newFile._id });
                    newFile.url = upload.url
                    newFile.public_id = upload.public_id
                    await newFile.save()
                    return newFile
                })
            }
        },
        updateFiles: async (_, { updatedFilesIds, docId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const files = await File.find({ docId })
            return files.map(async (file, index) => {
                console.log(updatedFilesIds.includes(file._id.toString()))
                if (!updatedFilesIds.includes(file._id.toString())) {
                    const isDeleted = await deleteFile(file.public_id)
                    if (isDeleted) return await File.deleteOne({ public_id: file.public_id })
                }
                else {
                    return await file.updateOne(
                        {
                            order: updatedFilesIds.findIndex(id => id === file._id.toString())
                        },
                        { new: true })
                }
            })
        },
        reorderFiles: async (_, { fileIds }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            if (fileIds) {
                fileIds.map(async (id, index) => {
                    return await File.findByIdAndUpdate(id, { order: index }, { new: true })
                })
            }
        },
        deleteSingleFile: async (_, { public_id }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const isDeleted = await deleteFile(public_id)
            if (isDeleted) await File.deleteOne({ public_id })
            return true
        },
        deleteFiles: async (_, { fileIds }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            if (fileIds) {
                fileIds.map(async (_id) => {
                    console.log(await File.deleteOne({ _id }))
                    return true
                })
            }
        },

    }

}



