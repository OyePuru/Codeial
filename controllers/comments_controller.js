const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.create = function (req,res) {
    Post.findById(req.body.post,function (err,post) {
        if(err) console.error("Some error occurred in finding post ID in comment")
        if(post){
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            },function(err,comment){
                if(err) console.error("Some error occurred in Creating Comment")
                post.comments.push(comment)
                post.save()
                res.redirect('/')
            })
        }
    })
}