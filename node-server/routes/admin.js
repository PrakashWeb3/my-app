var express = require('express');
var router = express.Router();
/**
 * Importing the Admin route controllers
 */
var AdminController = require('../controllers/adminController');
/**
 * Importing the middleware
 */
const JWTToken = require('../middleware/tokenVerify');
const Validation = require('../middleware/validateContacts');

/**
 * Admin Page Route
 */
router.get('/', function(req, res) {
  res.json({ title: 'You\'re in admin login page. Use default credentials' });
});

/**
 * Admin Login route
 * Default user : Admin pwd :123
 */
router.post('/',  AdminController.handleAdminLogin);

/**
 * Admin user add the contacts using /addContact route
 * middleware is check admin credentials and Contact details validation
 */
router.post('/addContact', [ JWTToken.verifyJWTToken , Validation.ValidateUser], AdminController.addContacts);

module.exports = router;
