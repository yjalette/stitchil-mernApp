const Designer = require("../../models/designer");
const { populateByUser } = require("../../consts/user");

module.exports = {
    Mutation: {
        updateDesigner: async (_, { designerInput }, req) => {
            try {
                const designer = await Designer.findOne({ creator: req.userId });
                await designer.updateOne({ $set: { ...designerInput } }, { new: true });

                designer.save()

            } catch (error) {
                throw new Error(error)
            }

            return true
        }
    }

}
