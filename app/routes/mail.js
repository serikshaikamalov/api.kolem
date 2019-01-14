const express        = require('express');
const router         = express.Router();
const mailController = require('../controllers/mail.controller');

router.get('/', mailController.sendEmail);

module.exports = router;