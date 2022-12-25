const path = require('path');
const fsPromises = require('fs').promises;
const bcrypt = require('bcryptjs'); // lib for encrypt the password
const jwt = require('jsonwebtoken'); // jwt lib for token system
const { validationResult  } = require('express-validator'); // display the validation result 

/**
 * Initialize the local json file into memory
 */
const usersDb = {
    users: require('../data/contacts.json'),
    setusers: function (data) { this.users = data }
}

/**
 * Method for handle the Contact User Login
 */
const handleUserLogin = async (req, res) => {
    
    const errors = validationResult(req); // validation result from middleware
	if (!errors.isEmpty()) {
    // console.log(errors.errors);
    return res.status(422).json({ errors: errors.errors[0]['msg'] }); // return if error
  }
  const {email,password} = req.body; // destructing the req.body

    // check duplicate
    const findUser = usersDb.users.find(person => person.email === email);
    
    if (!findUser) return res.status(401).json({ errors:  'Email ID is not Exists'});//unauthorized

    const match = await bcrypt.compare(password, findUser.password) ;// compare the stored password and login password
    if (match) {
       
        //generate Token if password match
        const accessToken = jwt.sign(
            {
                "email": findUser.email,
                "phone": findUser.phone,
                "firstname": findUser.firstName 
            }, process.env.ACCESS_SECRET_KEY, { expiresIn: '1h' }) ; 
                
        res.setHeader('token', accessToken); // setting up token 

        //res.cookie('jwt', accessToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 })
        
        res.status(200).json({ message:` Welcome to Mr. ${findUser.firstName} . You are logged in.` })

    } else {
        res.status(401).json({'error':'invalid access'});
    }
}

/**
 * Method for handle the Contact User Update
 */

const handleUserUpdate = async (req, res) => {
    const {dob,occupation,company} = req.body; // destructing the req.body
    const findUser = usersDb.users.find(person => person.email === req.email); // collect the logged in contact user
    
    const otherUsers = usersDb.users.filter(person => person.email !== req.email); // filter remaining contact users
   
    const currentUser = { ...findUser, occupation:occupation,  dob:dob,  company:company } // update the logged user contact details
    usersDb.setusers([...otherUsers, currentUser]); // update the user object 
    /**
     * Write the users object to file using fs lib
     */
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'data/contacts.json'),
        JSON.stringify(usersDb.users)
    );
    res.status(200).json({ message: `Contact Name ${findUser.firstName} has updated successfully.` }) // send success message

}

/**
 * Method for handle the Contact User Delete
 */

const handleUserDelete = async (req, res) => {
   
    const findUser = usersDb.users.find(person => person.email === req.email); // collect the logged in contact user
    
    const otherUsers = usersDb.users.filter(person => person.email !== req.email); // filter remaining contact users
    usersDb.setusers([...otherUsers]); // update only filtered contacts

    /**
     * Write the users object to file using fs lib
     */
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'data/contacts.json'),
        JSON.stringify(usersDb.users)
    );

    res.status(200).json({ message: `Contact Name ${findUser.firstName} has remove successfully.` }) // send success message


}


module.exports = { handleUserLogin,handleUserUpdate,handleUserDelete}