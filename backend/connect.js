const mongoose = require('mongoose');

module.exports = () => mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-frgtm.mongodb.net/${process.env.MONGO_DB}?w=1`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})


