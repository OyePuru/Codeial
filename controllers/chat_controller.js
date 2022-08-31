const Chat = require('../models/chat');
const { toObjectId } = require('../helper');

module.exports.sendMessage = async (req, res) => {
  try {
    if (!req.user || !req.params.id) {
      return res.redirect('back');
    }
    await Chat.create({
      message: req.body.message,
      sender: req.user.id,
      receiver: req.params.id
    });
    return res.redirect(`/chat/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
}

module.exports.allMessages = async (req, res) => {
  try {
    if (!req.user || !req.params.id) {
      return res.redirect('back');
    }
    const chats = await Chat.find({
      sender: { $in: [toObjectId(req.user.id), toObjectId(req.params.id)] },
      receiver: { $in: [toObjectId(req.user.id), toObjectId(req.params.id)] }
    });
    return res.render('chat', { receiver: req.params.id, messagelist: chats });
  } catch (error) {
    console.log(error);
  }
}