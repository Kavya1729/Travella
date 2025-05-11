const express = require('express');
const router = express.Router();
const {registerUser,loginUser,logoutUser,currentUser} = require('../Controllers/UserController');
// controllers calling

// token validation

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logoutUser);
router.get('/current',validateToken,currentUser);

module.exports = router;