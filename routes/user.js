const router = require('express').Router();
const { catchErrors } = require('../hadlers/errorHandlers');
const { register, login, currentUser,updateUserImage} = require('../controllers/userController');

router.post('/register', catchErrors(register));
router.post('/login', catchErrors(login));
router.get('/current', catchErrors(currentUser));
router.patch('/', catchErrors(updateUserImage));

module.exports = router;