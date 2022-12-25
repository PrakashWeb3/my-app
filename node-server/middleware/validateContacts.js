const { check  } = require('express-validator');
/**
 * new Contact details validation 
 */
const ValidateUser = [
    check('Name', 'Name is required').not().isEmpty().trim().escape(),
    check('State', 'State is required').not().isEmpty().trim().escape(),
    check('City', 'City is required').not().isEmpty().trim().escape(),
    check('Profile', 'Image is required').not().isEmpty().trim().escape(),
    check('Password','Password is required').not().isEmpty().trim().escape(),
    check('Email', 'Not Valid Email Address').isEmail().normalizeEmail(),   
    check('Mobile','Mobile no is required').isLength({min:10}).withMessage('Phone No 10 Digits only allowed').isMobilePhone()
  ]
/**
 * Conatct user login validation
 */
  const ValidateUserLogin = [
    check('Password').not().isEmpty().trim().escape(),
    check('Email', 'Not Valid Email Address').isEmail().normalizeEmail()
  ]
  module.exports={ValidateUser,ValidateUserLogin}
