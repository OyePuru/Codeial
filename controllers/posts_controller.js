const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect('back');
    } else if (!req.body.content) {
      req.flash('error', "Post Can't be empty");
      return res.redirect('back');
    }
    await Post.create({
      content: req.body.content,
      user: req.user._id
    });
		req.flash('success', 'Post Created');
    return res.redirect('back');
  } catch (error) {
    console.log(error);
  }
}

module.exports.destory = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      await post.remove();
      await Comment.deleteMany({ post: req.params.id });
		  req.flash('error', 'Post Removed');
      return res.redirect('back');
    }
    else {
      return res.redirect('back');
    }
  } catch (error) {
    console.log(error);
  }
}