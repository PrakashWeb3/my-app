
var express = require('express');
var router = express.Router();
/**
 * import external modules for specific path 
 */
const JWTToken = require('../middleware/tokenVerify'); // Token related modules
const Validation = require('../middleware/validateContacts'); // Validation related modules
/**
 * Import the Contact user controller module
 */
var UserController = require('../controllers/userController');

/**
 * Initialize the local json file into memory
 */
const usersDb = {
  users: require('../data/contacts.json'),
  setusers: function (data) { this.users = data }
}

/**
 * Check Contact Details usine GET method.
 * Middleware is check the void token
 */
router.get('/', JWTToken.verifyJWTToken,function(req, res) {

  const contactUser = usersDb.users.find(person => person.email === req.body.email);

  res.status(200).json(contactUser);
});

/**
 * POST method for Login the Contact user
 * Middleware id used to Validate the login Details
 */
router.post('/', Validation.ValidateUserLogin,  UserController.handleUserLogin);

/**
 * PUT method for Updating the contact details
 * middleware to verify the loggin credentials
 */
router.put('/',  JWTToken.verifyJWTToken, UserController.handleUserUpdate);

/**
 * DELETE method for Delete the contact details
 * middleware to verify the loggin credentials
 */
router.delete('/', JWTToken.verifyJWTToken, UserController.handleUserDelete);


module.exports = router;
