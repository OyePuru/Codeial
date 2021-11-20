const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    post : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.model.Types.ObjectId,
        ref : 'User'
    }
},{
    timestamps : true
})

const Post = mongoose.model('Post',postSchema)
module.exports = Post