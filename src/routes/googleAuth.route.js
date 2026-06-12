const express = require('express');
const { googleLogin } = require('../controllers/googleAuth.controller');

const router = express.Router();

// Expect { idToken } in body
router.post('/google', googleLogin);

module.exports = router;
