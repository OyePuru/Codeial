const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.create = function(req, res){
    if(!req.user){
      return res.redirect('back')
    }

    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){console.log('error in creating a post'); return;}

        return res.redirect('back');
    });
}

module.exports.destory = function (req,res) {
    Post.findById(req.params.id,function (err,post) {
        if(err) throw err
        if(post.user == req.user.id){
            post.remove()
            Comment.deleteMany({post:req.params.id},function (err) {
                return res.redirect('back')
            })
        }
        else{
            return res.redirect('back')
        }
    })
}