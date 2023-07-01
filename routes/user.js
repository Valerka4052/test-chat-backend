const router = require('express').Router();
const { catchErrors } = require('../hadlers/errorHandlers');
const { register, login, logout } = require('../controllers/userController')

router.post('/register', catchErrors(register));
router.post('/login', catchErrors(login));
router.post('/logout',catchErrors(logout));

module.exports = router;