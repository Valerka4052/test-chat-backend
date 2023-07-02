const router = require('express').Router();
const { catchErrors } = require('../hadlers/errorHandlers');
const { register, login, } = require('../controllers/userController');

router.post('/register', catchErrors(register));
router.post('/login', catchErrors(login));

module.exports = router;