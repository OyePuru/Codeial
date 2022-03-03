const Chat = require('../models/chat');
const User = require('../models/user');
const { toObjectId } = require('../helper');

module.exports.sendMessage = function (req, res) {
  if (!req.user || !req.params.id) {
    return res.redirect('back')
  }
  Chat.create({
    message: req.body.message,
    sender: req.user.id,
    receiver: req.params.id
  }, function (err, data) {
    if (err) throw err;
    return res.redirect(`/chat/${req.params.id}`);
  })
}

module.exports.allMessages = function (req, res) {
  if (!req.user || !req.params.id) {
    return res.redirect('back')
  }
  Chat.find({
    sender: {$in: [toObjectId(req.user.id), toObjectId(req.params.id)]},
    receiver: {$in: [toObjectId(req.user.id), toObjectId(req.params.id)]}
  }, function (err, data) {
    return res.render('chat', { receiver: req.params.id, messagelist: data });
  }
  );
}