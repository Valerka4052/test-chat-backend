const router = require('express').Router();
const { catchErrors } = require('../hadlers/errorHandlers');
const { register, login, currentUser} = require('../controllers/userController');

router.post('/register', catchErrors(register));
router.post('/login', catchErrors(login));
router.get('/current', catchErrors(currentUser));

module.exports = router;