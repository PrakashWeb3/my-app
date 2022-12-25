const { check  } = require('express-validator');
/**
 * new Contact details validation 
 */
const ValidateUser = [
    check('firstname', 'Firstname is required').not().isEmpty().trim().escape(),
    check('lastname', 'Lastname is required').not().isEmpty().trim().escape(),
    check('password','Password is required').not().isEmpty().trim().escape(),
    check('email', 'Not Valid Email Address').isEmail().normalizeEmail(),   
    check('phone','phone no is required').isLength({min:10}).withMessage('Phone No 10 Digits only allowed').isMobilePhone()
  ]
/**
 * Conatct user login validation
 */
  const ValidateUserLogin = [
    check('password').not().isEmpty().trim().escape(),
    check('email', 'Not Valid Email Address').isEmail().normalizeEmail()
  ]
  module.exports={ValidateUser,ValidateUserLogin}
