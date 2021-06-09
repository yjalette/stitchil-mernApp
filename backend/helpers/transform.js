const mongoose = require('mongoose');

function getObjectId(id) {
    return mongoose.Types.ObjectId(id)
}

exports.getObjectId = getObjectId;