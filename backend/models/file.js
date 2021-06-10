const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    public_id: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    cover: {
        type: Boolean,
        required: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    docId: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        required: false
    }
}
)


module.exports = mongoose.model('File', fileSchema)