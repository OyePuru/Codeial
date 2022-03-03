const express = require('express');
const router = express.Router();
const passport =  require('../config/passport-local-strategy');
const chatController = require('../controllers/chat_controller');
router.get('/:id',passport.checkAuthentication,chatController.allMessages);
router.post('/sendMessage/:id',passport.checkAuthentication,chatController.sendMessage);
module.exports = router;
