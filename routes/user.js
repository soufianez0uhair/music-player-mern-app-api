const express = require('express');
const { signUpUser, loginUser } = require('../controllers/userControllers');

const router = express.Router();

router
    .post('/signup', signUpUser)
    .post('/login', loginUser)

module.exports = router