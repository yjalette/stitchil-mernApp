const mongoose = require('mongoose');

module.exports = () => mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-frgtm.mongodb.net/${process.env.MONGO_DB}?w=1`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    // .then(async () => {
    //     // await mongoose.connection.db.collection('gigs').dropIndex("title_text")
    //     await mongoose.connection.db.collection('items').createIndex({ "$**": "text" })
    //     console.log(await mongoose.connection.db.collection('items').indexes())
    // });


