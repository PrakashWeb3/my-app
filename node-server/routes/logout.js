var express = require('express');
var router = express.Router();
const JWTToken = require('../middleware/tokenVerify');

/**
 * Simple logout process.
 * middleware is used for remove the token
 */
router.get('/', JWTToken.removeJWTToken, function(req, res, next) {
  res.json({message:'Logged out succssfully. Login again'});
});

module.exports = router;