const Post = require('../models/post');

module.exports.home = async (req,res) => {
  try {
    const posts = await Post.find({})
    .populate('user')
    .populate({
      path : 'comments',
      populate : {
        path : 'user'
      }
    });
    return res.render('home',{
      title : "Codeial | Home", posts : posts,
    });
  } catch (error) {
    console.log(error);
  }
}
