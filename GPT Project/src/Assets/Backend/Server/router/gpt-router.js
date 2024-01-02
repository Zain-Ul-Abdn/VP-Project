const express = require('express');
const chatController = require('../Controller/chats_controller');
const user = require('../Controller/user_controller');

const router = express.Router()

router.route('/chat').post(chatController.chat);
router.route('/chats').get(chatController.fetchQueries);

//router.route('/user').get(user.user);
//router.route('/users').post(user);


module.exports = router;