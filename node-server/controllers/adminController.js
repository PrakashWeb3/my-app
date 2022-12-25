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
    return user =='Admin@gmail.com' && pwd == 123;
}
/**
 * Method for Handling the Admin Login
 */
const handleAdminLogin = async(req,res) =>{
    console.log(req.body);
    const { email, password } = req.body; // Destructing the request Data
    if (!email || !password) {
        return res.status(400).json({ error: "username and password are required" }) // Check Valid Admin Credentials
    }  

    if(AdminAuthorize(email, password )){
        let token;
        try {
            token = jwt.sign({username:email,role:'admin'},process.env.ACCESS_SECRET_KEY,{expiresIn:'1h'}); // JWT sign for admin user
            //res.cookie('token',token);
            /**
             * you can set 3rd param as cookie options eg. { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 }
             */
            res.setHeader('x-access-token', token);
            
            res.status(200).json({status:'you are logged in Admin Role',api:'use /dashboard route to add users',webtoken:token, SuccessCode:1000}); // response with success message and token
            //res.status(301).redirect('/dashboard'); 
        } catch (error) {
            return res.status(403).json({ errorCode: 4,Message:error.message }) // Check Valid Admin Credentials
        }

       
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
   console.log(req.body)
    const {Name, State, City, Profile, Password,Email,Mobile,Description} = req.body; // Object Destructing from request Body

     // check duplicate
     const findDuplicatesInMail = usersDb.users.find(person => person.Email === Email);
     if (findDuplicatesInMail) return res.status(409).json({ "error": 'email already exists' }) // Checking email Id already existing from Contact JSON

     const findDuplicatesInPhone = usersDb.users.find(person => person.Mobile === Mobile);
     if (findDuplicatesInPhone) return res.status(409).json({ "error": 'Mobile no already exists' }) // Checking Phone no already existing from Contact JSON
   
     try {
        //hash the password       
      
        var salt = bcrypt.genSaltSync(5);
        var hashPwd = bcrypt.hashSync(Password, salt);
        //console.log(hash);
       // //create the new users contacts 
        const createUsers = {          
            "Profile": Name,
            "Name": Name,
            "Email": Email,
            "Mobile": Mobile,
            "State": State,
            "City": City,
            "Password": hashPwd,
            "Description":Description
           }
         console.log(createUsers)
        usersDb.setusers([...usersDb.users, createUsers]) // update the users objects

        //write to the database

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'data/contacts.json'),
            JSON.stringify(usersDb.users)
        );
        //console.log(usersDb.users);
        res.status(201).json({ SuccessCode: 1000,"message": `New User ${Name} is Added` }) // response for success adding new contacts
    } catch (err) {
        res.status(500).json({ 'error': err.message })
    }
    
}

/**
 * Method for get the new Contacts from admin log in
 */
const getContacts = async (req,res) =>{  
    
     try {
       
        
        //console.log(usersDb.users);
        res.status(201).json({ "data": usersDb.users,SuccessCode:1001 }) // response for success adding new contacts
    } catch (err) {
        res.status(500).json({ 'error': err.message })
    }
    
}
module.exports = { handleAdminLogin,addContacts,getContacts }