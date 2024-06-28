const express = require('express');
const router = express.Router();
const {signup, login, getAllUsers, logout} = require('../controllers/user.controller.js')
const {isUserValid} = require('../middlewares/tokenInspection.js')

router.route('/user/create').post(signup);
router.route('/user/login').post(login);
router.route('/user/logout').get(logout);



// dummy route to check token inspection middle -- delete later
router.route('/user').get(isUserValid,getAllUsers);


module.exports = router;