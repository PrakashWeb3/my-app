const path = require('path');
const fsPromises = require('fs').promises;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult  } = require('express-validator');

/**
 * Initialize the local json file into memory
 */

const usersDb = {
    users: require('../data/contacts.json'),
    setusers: function (data) { this.users = data }
}
/**
 * Admin log in exposed here 
 * We can get from .ENV file
 */
const AdminAuthorize = function(user,pwd){
    return user =='Admin' && pwd == 123;
}
/**
 * Method for Handling the Admin Login
 */
const handleAdminLogin = async(req,res) =>{
    
    const { user, pwd } = req.body; // Destructing the request Data
    if (!user || !pwd) {
        return res.status(400).json({ error: "username and password are required" }) // Check Valid Admin Credentials
    }  

    if(AdminAuthorize(user,pwd)){
        const token = jwt.sign({username:user,role:'admin'},process.env.ACCESS_SECRET_KEY,{expiresIn:'1h'}); // JWT sign for admin user
        //res.cookie('token',token);
        /**
         * you can set 3rd param as cookie options eg. { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 }
         */
        res.status(200).json({status:'you are logged in Admin Role',api:'use /addContact route to add contacts',webtoken:token}); // response with success message and token
    }else{
        res.status(403).json({error:'admin credential is not satisfied'});
    }
    
}

/**
 * Method for add the new Contacts from admin log in
 */
const addContacts = async (req,res) =>{  
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
    // console.log(errors.errors);
    return res.status(422).json({ errors: errors.errors[0]['msg'] }); // Response the Validation Error wile Adding New Contacts
  } 
    
    const {firstname,lastname,dob,email,phone,occupation,company,password} = req.body; // Object Destructing from request Body

     // check duplicate
     const findDuplicatesInMail = usersDb.users.find(person => person.email === email);
     if (findDuplicatesInMail) return res.status(409).json({ "error": 'email already exists' }) // Checking email Id already existing from Contact JSON

     const findDuplicatesInPhone = usersDb.users.find(person => person.phone === phone);
     if (findDuplicatesInPhone) return res.status(409).json({ "error": 'Phone no already exists' }) // Checking Phone no already existing from Contact JSON
   
     try {
        //hash the password       
      
        var salt = bcrypt.genSaltSync(5);
        var hashPwd = bcrypt.hashSync(password, salt);
        //console.log(hash);
       // //create the new users contacts 
        const createUsers = {
            firstName:firstname,
            lastName:lastname,
            dob:dob,
            email:email,
            phone:phone,
            occupation:occupation,
            company:company,
            password:hashPwd
           }
         
        usersDb.setusers([...usersDb.users, createUsers]) // update the users objects

        //write to the database

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'data/contacts.json'),
            JSON.stringify(usersDb.users)
        );
        //console.log(usersDb.users);
        res.status(201).json({ "message": `New Contact ${firstname} ${lastname} is Added` }) // response for success adding new contacts
    } catch (err) {
        res.status(500).json({ 'error': err.message })
    }
    
}
module.exports = { handleAdminLogin,addContacts }