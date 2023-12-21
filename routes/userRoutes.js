const express = require('express');
const {SaveUSer, Login, GetUserById} = require('../controllers/userControllers.js');
const router = express.Router();

router.post('/register', SaveUSer);

router.post('/login', Login);

router.get('/Details/:id', GetUserById);


module.exports = router;